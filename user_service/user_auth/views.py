from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages

from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic


# Create your views here.

def show_home(request):
    return render( request, 'user_auth/homePage.html')

def login_user(request):
    #se c'è una post eseg
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:  
            messages.success(request,("   There was an error on login please try again...  "))
            return redirect('login')
    else:
        return render(request, 'user_auth/login.html', {})

def signup(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()         #save the information that u fill on the form
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            user = authenticate(username=username, password=password)
            login(request, user)
            messages.success(request, ("Registration Successfull! "))
            return redirect('home')
    else:
        form = UserCreationForm()

    return render(request, 'user_auth/signup.html', {
        'form' : form,
    })

def logout_user(request):
    logout(request)
    messages.success(request,(" Successfully logged out"))
    return redirect('home')

def viewProfile(request):
    return render(request, 'user_auth/userProfile.html')

