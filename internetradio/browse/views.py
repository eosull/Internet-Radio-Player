from django.shortcuts import render
from .forms import SearchForm

from pyradios import RadioBrowser

def index(request):
    if request.method == 'POST':
        form = SearchForm(request.POST)
        if form.is_valid():
            rb = RadioBrowser()
            search_term = form.cleaned_data['search_term']
            search_result = rb.search(name=search_term)
            new_url = search_result[0]["url"].replace("http://", "https://")
            return render(request, 'index.html', {'form': form, 'search_result': search_result, 'new_url': new_url})
    else:
        form = SearchForm()
        return render(request, 'index.html', {'form': form})

    return render(request, 'index.html')