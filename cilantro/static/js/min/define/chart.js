define(["cilantro/define/form","cilantro/define/viewelement","cilantro/lib/highcharts"],function(a,b){var c=b.extend({constructor:function(a,b){this.options={chart:{marginBottom:50,renderTo:null,zoomType:"",events:{}},tooltip:{formatter:null},events:{},plotOptions:{series:{point:{events:{}},events:{click:null}},line:{animation:!0},pie:{dataLabels:{enabled:!0,formatter:function(){return this.point.name}},borderColor:"#000000",borderWidth:2,allowPointSelect:!1,cursor:"pointer",enableMouseTracking:!0,stickyTracking:!1,states:{hover:{brightness:-.1,enabled:!0}},point:{events:{mouseOver:function(){},mouseOut:function(){}}}},column:{dataLabels:{enabled:!0},allowPointSelect:!1,cursor:"pointer",borderColor:"#303030",borderWidth:1,enableMouseTracking:!0,stickyTracking:!1,states:{hover:{brightness:-.1,enabled:!0}}}},credits:{enabled:!1},legend:{enabled:!1},title:{text:null},series:[{name:null,data:null}]},this.base(a,b)},gainedFocus:function(){this.chart.xAxis[0].isDirty=!0,this.chart.yAxis[0].isDirty=!0,this.chart.isDirty=!0,this.chart.series[0].isDirty=!0,this.updateChart()},updateChart:function(){}},{SELECTED_BAR_COLOR:"005DA8",UNSELECTED_COLOR:"#C5C5C5",SELECTED_COLOR:"#99BDF1",EXCLUDE_COLOR:"#EE3A43",INCLUDE_COLOR:"#99BDF1",ALTERNATE_GRID_COLOR:"#FDFFD5",MINIMUM_SLICE:.04,map_data_to_display:function(a){var b={};$.each(a,function(a,c){b[c[0]]=c[1]});return b},map_display_to_data:function(a){var b={};$.each(a,function(a,c){b[c[1]]=c[0]});return b},nb_plural_to_singular_map:{"in":"exact","-in":"-exact"},nb_singular_to_plural_map:{exact:"in","-exact":"-in"}}),d=c.extend({constructor:function(b,d){this.selected=[];var e=this.map=c.map_data_to_display(b.data.choices),f=this.unmap=c.map_display_to_data(b.data.choices);this.negated=!1,this.range_form=new a({fields:[{datatype:"string",name:b.data.name,choices:b.data.choices,pk:b.data.pk}]},d),this.range_form=this.range_form.dom,this.range_form.find("select[multiple]").hide(),this.range_form.find("input").css("margin","10px"),$.each(b.data.coords,function(a,c){b.data.coords[a][0]=e[b.data.coords[a][0]]}),this.base(b,d)},notify:function(){this.dom.trigger("ElementChangedEvent",[{name:this.concept_pk+"_"+this.viewset.data.pk,value:this.selected}])},elementChanged:function(a,b){b.value!==null&&(b.value==="in"?this.negated=!1:this.negated=!0,this.updateChart())},updateDS:function(a,b){this.selected=b[this.concept_pk+"_"+this.viewset.data.pk],this.selected===undefined?this.selected=[]:$.isArray(this.selected)||(this.selected=[this.selected]),this.negated=b[this.concept_pk+"_"+this.viewset.data.pk+"_operator"]==="-in",this.range_form.triggerHandler(a,[b])},updateElement:function(a,b){b.name===this.concept_pk+"_"+this.viewset.data.pk?this.selected=b.value:b.name===this.concept_pk+"_"+this.viewset.data.pk+"_operator"&&b.value==="in"?this.negated=!1:this.negated=!0,this.range_form.triggerHandler(a,[b])},updateChart:function(){var a=this;$.map(this.chart.series[0].data,function(b,c){var d=b.name||b.category;$.inArray(a.unmap[d],a.selected)!==-1?a.negated?b.update({color:a.EXCLUDE_COLOR},!1):b.update({color:a.SELECTED_COLOR},!1):b.update({color:a.UNSELECTED_COLOR},!1)}),this.chart.redraw(),$.map(this.chart.series[0].data,function(a,b){$(a.tracker.element).mouseover(),$(a.tracker.element).mouseout()})},seriesClick:function(a){var b=a.point.category||a.point.name,c=$.inArray(this.unmap[b],this.selected);c===-1?(this.negated?a.point.update({color:this.EXCLUDE_COLOR}):a.point.update({color:this.SELECTED_COLOR}),this.selected.push(this.unmap[b])):(a.point.update({color:this.UNSELECTED_COLOR}),this.selected.splice(c,1)),this.notify(),this.updateChart(),this.chart.hoverPoint=a.point,this.chart.hoverSeries=a.point.series}}),e=d.extend({constructor:function(a,b){var d=a.data.coords,e=this.data_store={};$.each(d,function(a,b){e[b[0]]=b[1]});var f=0;$.each(d,function(a,b){f=f+b[1]});var g=f*c.MINIMUM_SLICE;$.each(d,function(a,b){b[1]<g&&(b[1]=g)}),this.base(a,b)},render:function(){this.dom=$('<div class="chart"></div>'),this.options.chart.renderTo=this.dom.get(0);var a=this;this.options.tooltip.formatter=function(){return""+a.data_store[a.unmap[this.point.name]]},this.options.chart.defaultSeriesType="pie",this.options.series[0].name=this.viewset.data.title,this.options.series[0].data=this.viewset.data.coords,this.options.title.text=this.viewset.data.title,this.options.plotOptions.series.events.click=$.proxy(this.seriesClick,this),this.chart=new Highcharts.Chart(this.options)},gainedFocus:function(a){this.base(),this.negated=!1},SELECTED_COLOR:c.SELECTED_COLOR,UNSELECTED_COLOR:c.UNSELECTED_COLOR,EXCLUDE_COLOR:c.EXCLUDE_COLOR}),f=d.extend({render:function(){var a=this;this.dom=$('<div class="chart"></div>'),this.options.chart.marginBottom=this.viewset.data.coords.length>6?100:50,this.options.chart.renderTo=this.dom.get(0),this.options.chart.defaultSeriesType="column",this.options.chart.events.redraw=$.proxy(this.redraw,this),this.options.chart.events.load=$.proxy(this.load,this),this.options.plotOptions.series.events.click=$.proxy(this.seriesClick,this),this.options.title.text=this.viewset.data.title,this.options.series[0].name=this.viewset.data.title,this.options.series[0].data=$.map(this.viewset.data.coords,function(a,b){return a[1]}),this.options.tooltip={formatter:function(){return this.point.category+", "+this.y}},this.options.xAxis={categories:$.map(this.viewset.data.coords,function(a,b){return a[0]}),title:{text:this.viewset.data.xaxis,margin:this.viewset.data.coords.length>6?90:50},labels:{align:this.viewset.data.coords.length>6?"left":"center",y:this.viewset.data.coords.length>6?10:20,rotation:this.viewset.data.coords.length>6?50:0,formatter:function(){var b=this.value;a.viewset.data.coords.length>6?b.length>20&&(b=b.substr(0,18)+".."):b=this.value.split(" ").join("<br/>");return b}}},this.options.yAxis={min:0,title:{text:this.viewset.data.yaxis},labels:{rotation:45}},this.chart=new Highcharts.Chart(this.options)},redraw:function(a){for(var b=0;b<this.chart.series[0].data.length;b++){var c=this.chart.series[0].data[b];$(c.dataLabel.element).unbind(),$(c.dataLabel.element).attr("fill",c.color),$(c.dataLabel.element).css("color",c.color),$(c.dataLabel.element).hover(function(a){$(this).css("cursor","pointer")},function(a){$(this).css("cursor","")});var d=this;$(c.dataLabel.element).click(function(a){return function(b){a.series.chart.hoverPoint=a,a.series.chart.isDirty=!0;var c=$.inArray(d.unmap[a.category],d.selected);c===-1?d.selected.push(d.unmap[a.category]):d.selected.splice(c,1),d.notify(),d.updateChart()}}(c))}},SELECTED_COLOR:c.SELECTED_BAR_COLOR,UNSELECTED_COLOR:"#999999"}),g=c.extend({constructor:function(b,c){var d=this.range_form=(new a({fields:[b.data]},c)).dom;this.base(b,c);var e=this.extremes=this.chart.xAxis[0].getExtremes(),f=e.max-e.min,g=1/3*f;$("input[name*=input0]",d).val((e.min+g).toFixed(1)),$("input[name*=input1]",d).val((e.min+2*g).toFixed(1)),this.range_form.bind("ElementChangedEvent",$.proxy(this.manual_field_handler,this)),this.manual_field_handler(null)},render:function(){this.range_form.find("input").css("margin","10px");var a=this.dom=$('<div class="chart"></div>');this.options.chart.renderTo=a.get(0),this.options.chart.defaultSeriesType="line",this.options.chart.zoomType="x",this.options.title.text=this.viewset.data.title,this.options.chart.events.selection=$.proxy(this.chartSelection,this),this.options.chart.events.click=$.proxy(this.chartClick,this),this.options.plotOptions.series.point.events.click=$.proxy(this.pointClick,this),this.options.series[0].name=this.viewset.data.title,this.options.series[0].data=this.viewset.data.coords,this.options.tooltip.formatter=function(){return""+this.y},this.options.xAxis={maxPadding:.05,startOnTick:!1,title:{text:this.viewset.data.xaxis},labels:{align:"center",y:20}},this.options.yAxis={min:0,title:{style:{fontWeight:"bold"},text:this.viewset.data.yaxis,rotation:270},labels:{rotation:45}},this.chart=new Highcharts.Chart(this.options),this.dom.append(this.range_form)},manual_field_handler:function(a){var b=null,d=this.chart.options,e=parseFloat($("input[name*=input0]",this.range_form).val()).toFixed(1),f=parseFloat($("input[name*=input1]",this.range_form).val()).toFixed(1);switch(this.range_form.find("select[name*=operator]").val()){case"range":b=c.INCLUDE_COLOR;case"-range":b=b||c.EXCLUDE_COLOR,d.chart.zoomType!=="x"&&(this.range_form.detach(),this.chart.destroy(),d.chart.zoomType="x",d.plotOptions.line.animation=!1,this.chart=new Highcharts.Chart(d),this.dom.append(this.range_form)),this.chart.xAxis[0].removePlotBand(),e&&f&&this.chart.xAxis[0].addPlotBand({from:e,to:f,color:b}),this.dom.trigger("ShowDependentsEvent");break;case"lt":b=c.INCLUDE_COLOR,d.chart.zoomType!==""&&(this.range_form.detach(),this.chart.destroy(),d.chart.zoomType="",d.plotOptions.line.animation=!1,this.chart=new Highcharts.Chart(d),this.dom.append(this.range_form)),this.chart.xAxis[0].removePlotBand(),e&&(this.chart.xAxis[0].addPlotLine({value:e,color:c.EXCLUDE_COLOR,width:3}),this.chart.xAxis[0].addPlotBand({from:this.extremes.min,to:e,color:b})),this.dom.trigger("ShowDependentsEvent");break;case"gt":b=c.INCLUDE_COLOR,d.chart.zoomType!==""&&(this.range_form.detach(),this.chart.destroy(),d.chart.zoomType="",d.plotOptions.line.animation=!1,this.chart=new Highcharts.Chart(d),this.dom.append(this.range_form)),this.chart.xAxis[0].removePlotBand(),e&&(this.chart.xAxis[0].addPlotLine({value:e,color:c.EXCLUDE_COLOR,width:3}),this.chart.xAxis[0].addPlotBand({from:e,to:this.extremes.max,color:b})),this.dom.trigger("ShowDependentsEvent");break;case"lte":b=c.INCLUDE_COLOR,d.chart.zoomType!==""&&(this.range_form.detach(),this.chart.destroy(),d.chart.zoomType="",d.plotOptions.line.animation=!1,this.chart=new Highcharts.Chart(d),this.dom.append(this.range_form)),this.chart.xAxis[0].removePlotBand(),e&&this.chart.xAxis[0].addPlotBand({from:this.extremes.min,to:e,color:b}),this.dom.trigger("ShowDependentsEvent");break;case"gte":b=c.INCLUDE_COLOR,d.chart.zoomType!==""&&(this.range_form.detach(),this.chart.destroy(),d.chart.zoomType="",d.plotOptions.line.animation=!1,this.chart=new Highcharts.Chart(d),this.dom.append(this.range_form)),this.chart.xAxis[0].removePlotBand(),e&&this.chart.xAxis[0].addPlotBand({from:e,to:this.extremes.max,color:b}),this.dom.trigger("ShowDependentsEvent");break;case"exact":b=c.INCLUDE_COLOR,d.chart.zoomType!==""&&(this.range_form.detach(),this.chart.destroy(),d.chart.zoomType="",d.plotOptions.line.animation=!1,this.chart=new Highcharts.Chart(d),this.dom.append(this.range_form)),this.chart.xAxis[0].removePlotBand(),e&&this.chart.xAxis[0].addPlotLine({value:e,color:c.INCLUDE_COLOR,width:3}),this.dom.trigger("ShowDependentsEvent");break;case"-exact":b=c.INCLUDE_COLOR,d.chart.zoomType!==""&&(this.range_form.detach(),this.chart.destroy(),d.chart.zoomType="",d.plotOptions.line.animation=!1,this.chart=new Highcharts.Chart(d),this.dom.append(this.range_form)),this.chart.xAxis[0].removePlotBand(),e&&this.chart.xAxis[0].addPlotLine({value:e,color:c.EXCLUDE_COLOR,width:3}),this.dom.trigger("ShowDependentsEvent");break;case"isnull":b=c.EXCLUDE_COLOR,d.chart.zoomType!==""&&(this.range_form.detach(),this.chart.destroy(),d.chart.zoomType="",d.plotOptions.line.animation=!1,this.chart=new Highcharts.Chart(d),this.dom.append(this.range_form)),this.chart.xAxis[0].removePlotBand(),this.chart.xAxis[0].addPlotLine({from:this.extremes.min,to:this.extremes.max,color:b}),this.dom.trigger("HideDependentsEvent");break;case"-isnull":d.chart.zoomType!==""&&(this.range_form.detach(),this.chart.destroy(),d.chart.zoomType="",d.plotOptions.line.animation=!1,this.chart=new Highcharts.Chart(d),this.dom.append(this.range_form)),this.dom.trigger("ShowDependentsEvent"),this.chart.xAxis[0].removePlotBand()}},updateDSEvent:function(a,b){this.range_form.triggerHandler(a,[b])},elementChanged:function(){},updateElement:function(a,b){this.range_form.triggerHandler(a,[b])},registerElements:function(a){$("select",this.range_form).change()},gainedFocus:function(a){this.base(),this.range_form.triggerHandler(a)},chartSelection:function(a){var b=a.target,c=this.range_form.find("select[name*=operator]").val()==="-range"?g.EXCLUDE_COLOR:g.INCLUDE_COLOR,d=a.xAxis[0].min,e=a.xAxis[0].max;d=d<this.extremes.min?this.extremes.min:d,e=e>this.extremes.max?this.extremes.max:e,d=parseFloat(d).toFixed(1),e=parseFloat(e).toFixed(1),$("input[name*=input0]",this.range_form).val(d).change(),$("input[name*=input1]",this.range_form).val(e).change(),a.preventDefault()},chartClick:function(a){var b=a.target;if(!this.chart.options.chart.zoomType){var c=a.xAxis[0].value;c=c<this.extremes.min?this.extremes.min:c,c=parseFloat(c).toFixed(1),$("input[name*=input0]",this.range_form).val(c).change()}},pointClick:function(a){if(!this.chart.options.chart.zoomType){var b=a.target.x;b=b<this.extremes.min?this.extremes.min:b,b=parseFloat(b).toFixed(1),$("input[name*=input0]",this.range_form).val(b).change()}}});return{BarChart:f,LineChart:g,PieChart:e}})