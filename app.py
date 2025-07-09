from flask import Flask, render_template, abort, current_app as app
from jinja2 import TemplateNotFound
import os, re, json
import logging
from azure.monitor.opentelemetry import configure_azure_monitor

# Configure Azure Monitor with OpenTelemetry
# Set the environment variable or define it here temporarily
os.environ["APPLICATIONINSIGHTS_CONNECTION_STRING"] = "InstrumentationKey=04920939-20c6-44d9-81eb-d0f57ae83b67;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/;ApplicationId=346dc131-0bb2-4309-bc87-2f885d5085bb"

# Set up telemetry collection
configure_azure_monitor(logger_name="akweb")

# Set up logger
logger = logging.getLogger("akweb")
logger.setLevel(logging.INFO)

# Create Flask app
app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route('/')
def home():
    logger.info("Visited home page")
    logger.info("Visited home page")
    return render_template('index.html')

@app.route('/comments')
def comments():
    logger.info("Visited comments page")
    logger.info("Visited comments page")
    return render_template('comments.html')

@app.route('/aboutme')
def about_me():
    logger.info("Visited aboutme page")
    logger.info("Visited aboutme page")
    return render_template('aboutme.html')

@app.route('/posts/<slug>')
def post(slug):
    logger.info(f"Visited post page for slug: {slug}")

    # Try to load from posts/ folder first
    possible_templates = [f"posts/{slug}.html", f"{slug}.html"]

    for template_name in possible_templates:
        try:
            return render_template("post.html", post_path=template_name, slug=slug)
        except TemplateNotFound:
            continue

    return "Post not found", 404

@app.route('/download')
def download():
    logger.info("Visited download page")
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
def trends():
    logger.info("Visited trends page")
    logger.info("Visited trends page")
    script_path = os.path.join(app.static_folder, 'js', 'blogData.js')

    if not os.path.exists(script_path):
        logger.error("blogData.js not found")
        logger.error("blogData.js not found")
        return "blogData.js not found", 500

    with open(script_path, 'r', encoding='utf-8') as f:
        js_content = f.read()

    match = re.search(r'blogPosts\s*=\s*JSON\.parse\(\s*`(.*?)`\s*\);', js_content, re.DOTALL)
    if not match:
        logger.error("No blog post data found in blogData.js")
        logger.error("No blog post data found in blogData.js")
        return "No blog post data found in blogData.js", 500

    json_string = match.group(1)

    try:
        blog_posts = json.loads(json_string)
    except json.JSONDecodeError as e:
        logger.exception("Error parsing blog post data")
        logger.exception("Error parsing blog post data")
        return f"Error parsing blog post data: {e}", 500

    return render_template('trends.html', posts=blog_posts)

if __name__ == '__main__':
    app.run(debug=False)