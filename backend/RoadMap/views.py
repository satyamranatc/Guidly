from rest_framework.decorators import api_view
from rest_framework.response import Response

from .utils import AskAi

from .db import RoadMaps_collection

@api_view(['POST'])
def RoadMapView(request):
    
    res = AskAi.askAi(request.data['prompt'])
    RoadMaps_collection.insert_one(res)
    return Response(res)
