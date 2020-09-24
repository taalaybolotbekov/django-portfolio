from django.shortcuts import render , redirect
from .models  import Portfolio
import telebot
from django.core.mail import send_mail
from django.views import View
from .forms import ApplicationsForm


bot = telebot.TeleBot('1116291257:AAFuY9YASfUnBJ6nwwLyvwJiLJykcepzgLI')


def index(request):
    portfolio = Portfolio.objects.all()
    form = ApplicationsForm()
    return render(request, 'myapp/index.html', {'port': portfolio, 'form': form})

def portfolio_1(request):
    return render (request,'myapp/portfolio-details.html')

class ApplicationsView(View):
    def post(self, request):
        if request.method == 'POST':
            form = ApplicationsForm(request.POST)
            # print(request.POST)
        if form.is_valid():
            form.save()
            mail = form.cleaned_data['mail']
            name = form.cleaned_data['name']
            comment = form.cleaned_data['comment']
            subject = 'Новая заявка на подписку!'
            from_email = 'bolotbekovtaalay@gmail.com'
            to_email = ['bolotbekovtaalay@gmail.com']
            message = 'Новая заявка!' + '\r\n' + '\r\n' + 'Почта: ' + mail + '\r\n' + '\r\n' + 'Имя:' + name + '\r\n' + 'Коммент' + comment
            send_mail(subject, message, from_email, to_email, fail_silently=False)
            bot.send_message(449062776, message)
        return redirect('home')