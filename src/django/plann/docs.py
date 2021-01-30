import inspect

from django.urls import get_resolver, reverse


class DocsCreator:
    '''Markdown string documentation creator'''

    @staticmethod
    def api():
        '''API documentation'''

        title = '# API'
        content = (
            '## {url}\n\n{text}'.format(
                url=reverse(
                    f'api:{urlpattern.name}',
                    **({'kwargs': {'pk': 1}} if '<pk>' in str(urlpattern.pattern.regex) else {})
                ),
                text=inspect.getdoc(urlpattern.callback.cls()),
            )
            for urlpattern in get_resolver().namespace_dict['api'][1].url_patterns
        )
        return '\n\n'.join((title, *content))
