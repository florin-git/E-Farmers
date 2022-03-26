from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .forms import RegisterUserForm
#for show profile
from django.views.generic import DetailView
from .models import Profile

# Create your views here.

class ShowProfilePageView(DetailView):
    model = Profile
    template_name = 'user_auth/userProfile.html'

    def get_context_data(self, *args, **kwargs):
        #users = Profile.objects.all()
        context = super(ShowProfilePageView, self).get_context_data(*args,**kwargs)
        
        page_user = get_object_or_404(Profile, id = self.kwargs['pk'])
        
        context["page_user"] = page_user
        return context
    

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
        form = RegisterUserForm(request.POST)
        if form.is_valid():
            form.save()         #save the information that u fill on the form
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            user = authenticate(username=username, password=password)
            login(request, user)
            messages.success(request, ("Registration Successfull! "))
            return redirect('home')
    else:
        form = RegisterUserForm()

    return render(request, 'user_auth/signup.html', {
        'form' : form,
    })

def logout_user(request):
    logout(request)
    messages.success(request,(" Successfully logged out"))
    return redirect('home')


