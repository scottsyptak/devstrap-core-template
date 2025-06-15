# backend/app/utils/templates.py

from time import time
from pathlib import Path
from fastapi.templating import Jinja2Templates
from typing import Final, Optional
from fastapi import Request
from starlette.templating import _TemplateResponse as TemplateResponse
from app.utils.manifest import parse_manifest_entry
from operator import itemgetter

# Determine the correct path to the templates directory
TEMPLATES_DIR: Final[str] = Path(__file__).resolve().parent.parent / "templates"

templates: Final[Jinja2Templates] = Jinja2Templates(directory=TEMPLATES_DIR)

def render(
    template_name: str,
    request: Request,
    extra_context: Optional[dict] = None
) -> TemplateResponse:
    """
    Render a Jinja2 template with JS and CSS asset filenames from the Vite manifest.
    Extra variables can be passed via the `extra_context` dictionary.
    """
    asset_file_map = parse_manifest_entry("index.html")
    js_filename, css_filename = itemgetter("js", "css")(asset_file_map)

    context = {
        "request": request,
        "time": str(int(time())),
        "js_bundle": js_filename,
        "css_bundle": css_filename,
    }

    if extra_context:
        context.update(extra_context)

    return templates.TemplateResponse(template_name, context)
