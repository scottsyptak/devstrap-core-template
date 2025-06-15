# backend/app/routes/demo.py

from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse, RedirectResponse
from starlette.templating import _TemplateResponse as TemplateResponse
from app.utils.templates import render

router = APIRouter(prefix="/demo/rendering")

@router.get("")
def redirect_to_hybrid():
    return RedirectResponse(url="/demo/rendering/hybrid", status_code=302)

@router.get("/client-side", response_class=HTMLResponse)
def client_side(request: Request) -> TemplateResponse:
    return render("pages/demo/rendering/client-side.jinja", request)

@router.get("/hybrid", response_class=HTMLResponse)
def hybrid_render(request: Request) -> TemplateResponse:
    return render("pages/demo/rendering/hybrid.jinja", request)

@router.get("/server-side", response_class=HTMLResponse)
def server_side_render(request: Request) -> TemplateResponse:
    return render("pages/demo/rendering/server-side.jinja", request, {
        "user": "Visitor"
    })
