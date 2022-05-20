from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .forms import RegisterUserForm
#for show profile
from django.views.generic import DetailView
from .models import Profile

# Create your views here.

class ShowProfilePageView(DetailView):
    """model = Profile
    template_name = 'user_auth/userProfile.html'

    def get_context_data(self, *args, **kwargs):

        context = super(ShowProfilePageView, self).get_context_data(*args,**kwargs)

        page_user = get_object_or_404(Profile, id = self.kwargs['pk'])
        
        context["page_user"] = page_user
        return context
    """
    profile = Profile

    def dispatch(self, request, *args, **kwargs):
        self.profile, __ = Profile.objects.get_or_create(user=request.user)
        return super(ShowProfilePageView, self).dispatch(request, *args, **kwargs)

    def get(self, request):
        context = {'profile': self.profile}
        return render(request, 'user_auth/userProfile.html', context)

    def post(self, request):
        form = RegisterUserForm(request.POST, request.FILES, instance=self.profile)

        if form.is_valid():
            profile = form.save()
            
            # to save user model info
            profile.user.first_name = form.cleaned_data.get('first_name')
            profile.user.last_name  = form.cleaned_data.get('last_name')
            profile.user.email      = form.cleaned_data.get('email')
            profile.user.save()
            
            messages.success(request, 'Profile saved successfully')
        else:
            messages.success(request,("   There was an error on login please try again...  "))
            return redirect('home')
        return redirect('profile')

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
            form.save()         #save the information that u fill on the form - use commit = false ??
           
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']

            
            #automatic login - leave it if u don't want it!
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

