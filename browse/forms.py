from django import forms
from django.forms import TextInput

class SearchForm(forms.Form):

    search_term = forms.CharField(widget=forms.TextInput(
                                  attrs={
                                    'placeholder': 'What do you want to hear?',
                                    'style': 'width: 300px;',
                                    'class': 'form-control text-center'
                                    }),
                                    label=''
                                    )