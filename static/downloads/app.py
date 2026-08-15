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
        }
    ]
    return render_template('download.html', files=files)
