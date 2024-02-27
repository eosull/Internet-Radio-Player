from django.shortcuts import render
from .forms import SearchForm

from pyradios import RadioBrowser

def index(request):
    if request.method == 'POST':
        form = SearchForm(request.POST)
        if form.is_valid():
            searched = True
            rb = RadioBrowser()
            search_term = form.cleaned_data['search_term']
            search_result = rb.search(name=search_term, hidebroken=True)

            if not search_result:
                context = {
                    'form': form,
                    'searched': searched
                }
                return render(request, 'index.html', context)
            else:
                context = {
                    'form': form,
                    'search_result': search_result,
                    'searched': searched
                }
                return render(request, 'index.html', context)

    else:
        searched = False
        form = SearchForm()
        context = {
                    'form': form,
                    'searched': searched
                }
        return render(request, 'index.html', context)

    return render(request, 'index.html')