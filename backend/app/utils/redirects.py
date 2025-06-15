# backend/app/utils/redirects.py

from fastapi import APIRouter
from fastapi.responses import RedirectResponse
from starlette.responses import Response

def slash_redirect(router: APIRouter, path_with_slash: str, redirect_target: str) -> None:
    """
    Registers a redirect route on the given router.

    Args:
        router: The FastAPI router to register the redirect with.
        path_with_slash: The URL path with a trailing slash (e.g. "/demo/").
        redirect_target: The URL to redirect to (e.g. "/demo").
    """
    @router.get(path_with_slash, include_in_schema=False)
    async def _redirect() -> Response:
        return RedirectResponse(url=redirect_target, status_code=308)
