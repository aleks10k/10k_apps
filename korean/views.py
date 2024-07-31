import json

from django.http import HttpResponse
from django.shortcuts import render
from django.views import View

from korean.difficulty_configurators import EasyConfig, MediumConfig, BatchimConfig
from korean.difficulty import Easy, Medium, Hard, Batchims


class MainPage(View):
    def get(self, request):
        return render(request, 'korean/main.html')


class BatchimsPage(View):
    def get(self, request):
        return render(request, 'korean/batchims.html')


class EasyView(View):

    def post(self, request):

        config = EasyConfig(json.loads(request.body))

        if config.is_empty():
            difficulty = Easy()
        else:
            parameters = config.get_parameters()
            difficulty = Easy(**parameters)

        questions = difficulty.compose_questions()
        response = json.dumps(questions)

        return HttpResponse(response)


class MediumView(View):

    def post(self, request):

        config = MediumConfig(json.loads(request.body))

        if config.is_empty():
            difficulty = Medium()
        else:
            parameters = config.get_parameters()
            difficulty = Medium(**parameters)

        questions = difficulty.compose_questions()
        response = json.dumps(questions)

        return HttpResponse(response)


class HardView(View):

    def post(self, request):

        difficulty = Hard()
        questions = difficulty.compose_questions()
        response = json.dumps(questions)

        return HttpResponse(response)


class BatchimsView(View):

    def post(self, request):

        config = BatchimConfig(json.loads(request.body))

        if config.is_empty():
            difficulty = Batchims()
        else:
            parameters = config.get_parameters()
            difficulty = Batchims(**parameters)

        questions = difficulty.compose_questions()
        response = json.dumps(questions)

        return HttpResponse(response)
