from flask import Flask, render_template, abort, current_app as app
import os, re, json

# This ensures Flask knows where to find your HTML and static files
app = Flask(__name__, template_folder='templates', static_folder='static')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/comments')
def comments():
    return render_template('comments.html')

@app.route('/aboutme')
def about_me():
    return render_template('aboutme.html')

@app.route('/posts/<slug>')
def post(slug):
    template_name = f"posts/{slug}.html"
    return render_template("post.html", post_path=template_name, slug=slug)

@app.route('/download')
def download():
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
        # Add more if you like
    ]
    return render_template('download.html', files=files)

@app.route('/trends')
def trends():
    script_path = os.path.join(app.static_folder, 'js', 'blogData.js')

    if not os.path.exists(script_path):
        return "blogData.js not found", 500

    with open(script_path, 'r', encoding='utf-8') as f:
        js_content = f.read()

    match = re.search(r'blogPosts\s*=\s*JSON\.parse\(\s*`(.*?)`\s*\);', js_content, re.DOTALL)
    if not match:
        return "No blog post data found in blogData.js", 500

    json_string = match.group(1)

    try:
        blog_posts = json.loads(json_string)
    except json.JSONDecodeError as e:
        return f"Error parsing blog post data: {e}", 500

    return render_template('trends.html', posts=blog_posts)


if __name__ == '__main__':
    app.run(debug=True)
