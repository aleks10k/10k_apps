from django.shortcuts import render, HttpResponseRedirect
from django.urls import reverse
from django.views import View


class HomePage(View):

    def get(self, request):

        return render(request, 'home/home.html')


class AnswerRedirect(View):

    def get(self, request):

        return HttpResponseRedirect(reverse('home:home'))
