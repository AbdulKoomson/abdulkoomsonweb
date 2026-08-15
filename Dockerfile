# abdulkoomson.com — Flask app, previously Azure App Service (PYTHON|3.13).
#
# Runs alongside the pt-mktg stack on the shared host rather than on its own
# instance: the whole app is a handful of cached template routes and ~100 MB
# resident, and the box already runs Caddy for TLS. A dedicated App Runner
# service or Lightsail box would cost $5-25/month to serve the same thing.
#
# Build context is this repository.

FROM python:3.13-slim

# gunicorn binds here; Caddy is the only thing that talks to it.
ENV PORT=8000 \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

# Dependencies first so edits to templates and static assets do not invalidate
# the pip layer.
COPY requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip \
 && pip install --no-cache-dir -r requirements.txt

COPY . .

# Never bake secrets into the image. The .env files in this repository are for
# local development and Azure App Service settings; the container takes its
# configuration from the environment.
RUN rm -f .env .env.* create_env_files.sh \
 && find . -maxdepth 2 -name '*.pyc' -delete

# Run unprivileged. The app writes nothing to disk — blog data is parsed from
# static/js/blogData.js at startup and cached in memory.
RUN useradd --create-home --shell /usr/sbin/nologin appuser \
 && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD python -c "import urllib.request,sys; sys.exit(0 if urllib.request.urlopen('http://127.0.0.1:8000/health',timeout=4).status==200 else 1)"

# Two workers is ample for a cached brochure site and keeps the footprint near
# 100 MB. The 5-minute route cache is per-process, so more workers would only
# multiply memory and cache misses.
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "2", "--threads", "4", \
     "--access-logfile", "-", "--error-logfile", "-", "app:app"]
