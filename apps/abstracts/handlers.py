from typing import (
    Optional,
)

from django.core.handlers.wsgi import WSGIRequest
from django.http import HttpResponse

from abstracts.mixins import HttpResponseMixin


class ViewHandler(HttpResponseMixin):
    """Handler for validating request and generating response."""

    def get_validated_response(
        self,
        request: WSGIRequest
    ) -> Optional[HttpResponse]:
        """GET validated response."""

        if request.user.is_authenticated:
            return None

        return self.get_http_response(
            request,
            'flat/user_login.html'
        )