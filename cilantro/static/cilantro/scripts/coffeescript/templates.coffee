define [
    'environ'
    'use!underscore'
], (environ, _) ->

    container = _.template '
        <div class=area-container>
            <h3 class=heading></h3>
            <div class=content></div>
        </div>
    '

    accordianGroup = _.template '
        <div class=accordian-group>
            <div class=accordian-heading>
                <a class=accordian-toggle data-toggle=collapse data-parent={{ parent }} href=#{{ slug }}>{{ name }}</a>
                <i class=icon-filter></i>
            </div>
            <div id={{ slug }} class="accordian-body collapse">
                <ul class=nav></ul>
            </div>
        </div> 
    '

    queryview = _.template '
        <div class="area-container queryview">
            <h3 class=heading>
                {{ name }} <small>{{ category }}</small>
            </h3>
            <div class=btn-toolbar>
                <button data-toggle=detail class="btn btn-small"><i class=icon-info-sign></i></button>
            </div>
            <div class=details>
                <div class=description>{{ description }}</div>
            </div>
            <div class="content row-fluid">
                <div class="span6 controls"></div>
                <div class="span6 charts"></div>
            </div>
        </div>
    '


    { container, accordianGroup, queryview }
