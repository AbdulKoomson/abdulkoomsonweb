from flask import Flask, render_template, abort, redirect, url_for
import os, urllib.parse

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/post/<slug>')
def post(slug):
    path = f"posts/{slug}.html"
    full_path = os.path.join(app.template_folder, path)
    if not os.path.exists(full_path):
        abort(404)
    return render_template('post.html', slug=slug, post_path=path)

@app.route('/downloads')
def downloads():
    files = [
        {
            'name': 'app.py',
            'description': 'initial demo of mywebsite backend app',
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
        },
        {
            'name': 'ChatGPT Image Jun 30, 2025, 10_03_27 AM.png',
            'description': 'initial logo for my startup',
            'assigned': 'Abdul Koomson',
            'status': 'IN PROGRESS',
            'url': 'https://akwebsa.blob.core.windows.net/downloads/ChatGPT%20Image%20Jun%2030,%202025,%2010_03_27%20AM.pngg'
        },
        {
            'name': 'ChatGPT Image Jun 30, 2025, 10_03_29 AM.png',
            'description': 'initial logo for my startup',
            'assigned': 'Abdul Koomson',
            'status': 'IN PROGRESS',
            'url': 'https://akwebsa.blob.core.windows.net/downloads/ChatGPT%20Image%20Jun%2030,%202025,%2010_03_29%20AM.png'
        },
        {
            'name': 'ChatGPT Image Jun 30, 2025, 10_03_30 AM.png',
            'description': 'initial logo for my startup',
            'assigned': 'Abdul Koomson',
            'status': 'IN PROGRESS',
            'url': 'https://akwebsa.blob.core.windows.net/downloads/ChatGPT%20Image%20Jun%2030,%202025,%2010_03_30%20AM.png'
        },
        {
            'name': 'Logo_Screenshot 2025-06-30 083611.png',
            'description': 'initial logo for my startup',
            'assigned': 'Abdul Koomson',
            'status': 'IN PROGRESS',
            'url': 'https://akwebsa.blob.core.windows.net/downloads/Logo_Screenshot%202025-06-30%20083611.png'
        }
    ]
    return render_template('download.html', files=files)

@app.route('/trends')
def trends():
    script_path = os.path.join(app.static_folder, 'script.js')

    with open(script_path, 'r', encoding='utf-8') as f:
        js_content = f.read()

    # Extract blogPosts array using regex
    match = re.search(r'const blogPosts\s*=\s*(\[\s*{.*?}\s*]);', js_content, re.DOTALL)
    if not match:
        return "No blog post data found", 500

    # Convert JS object array to JSON format
    js_array_str = match.group(1)
    js_array_str = re.sub(r'(\w+):', r'"\1":', js_array_str)  # Quote keys
    js_array_str = js_array_str.replace("'", '"')  # Replace single quotes

    try:
        blog_posts = json.loads(js_array_str)
    except json.JSONDecodeError as e:
        return f"Error parsing blog post data: {e}", 500

    return render_template('trends.html', posts=blog_posts)

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True)