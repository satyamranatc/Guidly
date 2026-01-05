import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import serializer


from .utils import AskAi

from .db import RoadMaps_collection

@api_view(['POST'])
def RoadMapView(request):
    
    prompt = request.data['prompt']
    userId = request.data['userId']
    data = AskAi.askAi(prompt)

    RoadMaps_collection.insert_one(data)
    data["_id"] = str(data["_id"])
    
    

    return Response({
        "message": "Success",
        "data": data
    })