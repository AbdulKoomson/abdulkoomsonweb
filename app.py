from flask import Flask, render_template, request, abort, current_app as app
from jinja2 import TemplateNotFound
import os, re, json
import logging
from azure.monitor.opentelemetry import configure_azure_monitor
from flask_caching import Cache


# Set up telemetry collection
configure_azure_monitor(logger_name="arkwebapp")

# Set up logger
logger = logging.getLogger("arkwebapp")
logger.setLevel(logging.INFO)

# Create Flask app
app = Flask(__name__, template_folder='templates', static_folder='static')

# Configure caching - use SimpleCache for development, Redis for production
# For production on Azure, you'd want to use Redis instead:
# cache = Cache(app, config={'CACHE_TYPE': 'RedisCache', 'CACHE_REDIS_URL': os.getenv('REDIS_URL')})
cache = Cache(app, config={'CACHE_TYPE': 'SimpleCache'})

# Pre-load blog posts data at startup
def load_blog_posts():
    """Load blog posts once at application startup"""
    script_path = os.path.join(app.static_folder, 'js', 'blogData.js')
    
    if not os.path.exists(script_path):
        logger.error("blogData.js not found during startup")
        return []

    try:
        with open(script_path, 'r', encoding='utf-8') as f:
            js_content = f.read()

        match = re.search(r'blogPosts\s*=\s*JSON\.parse\(\s*`(.*?)`\s*\);', js_content, re.DOTALL)
        if not match:
            logger.error("No blog post data found in blogData.js during startup")
            return []

        json_string = match.group(1)
        blog_posts = json.loads(json_string)
        logger.info(f"Successfully loaded {len(blog_posts)} blog posts at startup")
        return blog_posts
        
    except Exception as e:
        logger.exception("Error loading blog posts during startup")
        return []

# Load blog posts once when the application starts
blog_posts = load_blog_posts()

@app.route('/')
@cache.cached(timeout=300)  # Cache for 5 minutes
def home():
    logger.info("Visited home page")
    ai_connection_string = os.getenv("APPLICATIONINSIGHTS_CONNECTION_STRING")
    return render_template("index.html", ai_connection_string=ai_connection_string)

@app.route('/comments')
@cache.cached(timeout=300)  # Cache for 5 minutes
def comments():
    logger.info("Visited comments page")
    return render_template('comments.html')

@app.route('/aboutme')
@cache.cached(timeout=300)  # Cache for 5 minutes
def about_me():
    logger.info("Visited aboutme page")
    return render_template('aboutme.html')

@app.route('/posts/<slug>')
@cache.cached(timeout=300, query_string=True)  # Cache for 5 minutes, different cache for each slug
def post(slug):
    logger.info(f"Visited post page for slug: {slug}")
    possible_templates = [f"posts/{slug}.html", f"{slug}.html"]

    for template_name in possible_templates:
        try:
            return render_template("post.html", post_path=template_name, slug=slug)
        except TemplateNotFound:
            continue

    return "Post not found", 404

@app.route('/download')
@cache.cached(timeout=3600)  # Cache for 1 hour (file list doesn't change often)
def download():
    logger.info("Visited download page")
    files = [
        {
            'name': 'app.py',
            'description': 'initial demo of my website backend app',
            'assigned': 'Abdul Koomson',
            'status': 'IN PROGRESS',
            'url': 'https://akwebsa.blob.core.windows.net/downloads/app.py'
        },
        {
            'name': 'ChatGPT Image Jun 30, 2025, 10_03_26 AM.png',
            'description': 'initial logo for my startup',
            'assigned': 'Abdul Koomson',
            'status': 'IN PROGRESS',
            'url': 'https://akwebsa.blob.core.windows.net/downloads/ChatGPT%20Image%20Jun%2030,%202025,%2010_03_26%20AM.png'
        }
    ]
    return render_template('download.html', files=files)

@app.route('/trends')
@cache.cached(timeout=300)  # Cache for 5 minutes
def trends():
    logger.info("Visited trends page")
    # Use the pre-loaded blog posts data instead of reading from disk every time
    if not blog_posts:
        logger.error("No blog post data available")
        return "Blog data not available", 500
        
    return render_template('trends.html', posts=blog_posts)

# Optional route for receiving custom telemetry events from client
@app.route('/log-event', methods=['POST'])
def log_event():
    try:
        data = request.json
        logger.info(f"Custom Event: {data}")
        return "Logged", 200
    except Exception as e:
        logger.exception("Failed to log custom event")
        return "Error", 500

# Health check endpoint for Azure (uncached)
@app.route('/health')
def health():
    return "OK", 200

# Only run with flask dev server if executed directly (for local development)
if __name__ == '__main__':
    # This should only be used for local development
    # In production, use gunicorn as described in the startup command
    app.run(debug=False, host='0.0.0.0', port=8000)