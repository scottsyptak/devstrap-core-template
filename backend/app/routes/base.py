# backend/app/routes/base.py

from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from starlette.templating import _TemplateResponse as TemplateResponse
from app.utils.templates import render
from app.utils.redirects import slash_redirect

router = APIRouter(
    redirect_slashes=True  # This is the default, but you can declare it explicitly
)

@router.get("/", response_class=HTMLResponse)
def home_page(request: Request) -> TemplateResponse:
    return render("pages/home.jinja", request)

@router.get("/api-status", response_class=HTMLResponse)
def api_status(request: Request) -> TemplateResponse:
    return render("pages/api-status.jinja", request)

@router.get("/demo", response_class=HTMLResponse)
def demo_entry(request: Request) -> TemplateResponse:
    return render("errors/no-direct-access.jinja", request)

# Add trailing slash redirects
slash_redirect(router, "/demo/", "/demo")
slash_redirect(router, "/demo/rendering/", "/demo/rendering")

# # Redirects with trailing slashes (manual method, used if `redirect_slashes=False`)
# @router.get("/demo/", include_in_schema=False)
# def demo_slash_redirect():
#     return RedirectResponse(url="/demo", status_code=308)
