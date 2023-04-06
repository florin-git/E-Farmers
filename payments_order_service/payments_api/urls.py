from django.contrib import admin
from django.urls import path
from .views import *
# from django.conf.urls import url



urlpatterns = [
    path('payment/', NewView.as_view({
        'post':'test_payment'
    })),
    path('save-stripe-info/', NewView.as_view({
        'post':'save_stripe_info'
    })),
    path('getSpecificOrder/<str:payment_method_id>', NewView.as_view({
        'get':'getSpecificOrder'
    })),
    path('getSpecificOrderByRider/<int:rider_id>', NewView.as_view({
        'get':'getSpecificOrderByRider'
    })),
    path('update-order/', NewView.as_view({
        'patch':'updateOrder'
    })),
    path('update-status-rider/', NewView.as_view({
        'patch':'updateStatusRider'
    })),
    path('get-orders/<str:email>', NewView.as_view({
        'get':'getOrders'
    }))
    #path('create-payment-intent/<pk>/', StripeIntentView.as_view(), name='create-payment-intent'),
    #path('webhooks/stripe/', stripe_webhook, name='stripe-webhook'),
    #path('cancel/', CancelView.as_view(), name='cancel'),
    #path('success/', SuccessView.as_view({
    #    'put' : 'addorder'
    #}), name='success'),
    #path('', ProductLandingPageView.as_view(), name='landing-page'),
    #path('create-checkout-session/<pk>/', CreateCheckoutSessionView.as_view(), name='create-checkout-session'),
    #path('orders/<int:user_id>/', OrdersView.as_view({
    #    'get' : 'get_orders',
    #})),
    #path('checkout/', StripeCheckoutView.as_view({    'post' : 'POSTDIO' })),
]


