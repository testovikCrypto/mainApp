(self.webpackChunktradingview=self.webpackChunktradingview||[]).push([[3596],{25008:(e,t,i)=>{"use strict";i.r(t),i.d(t,{ChartPropertyDefinitionsViewModel:()=>Lt});var n=i(50151),r=i(44352),o=i(2484),l=(i(8169),i(97070),i(40549)),s=i.n(l),a=i(65279),c=i(82623),d=i(11954),u=i(43074),p=i(37364),h=i(68622),v=i(35663),g=i(47539),y=i(1930),P=i(52865),f=i(21580),b=i(7019);const m=new g.TranslatedString("change symbol description visibility",r.t(null,void 0,i(26717))),w=new g.TranslatedString("change symbol legend format",r.t(null,void 0,i(95071))),S=new g.TranslatedString("change open market status visibility",r.t(null,void 0,i(18644))),D=new g.TranslatedString("change OHLC values visibility",r.t(null,void 0,i(57889))),_=new g.TranslatedString("change bar change visibility",r.t(null,void 0,i(45110))),T=new g.TranslatedString("change indicator arguments visibility",r.t(null,void 0,i(96162))),C=new g.TranslatedString("change indicator titles visibility",r.t(null,void 0,i(31325))),k=new g.TranslatedString("change indicator values visibility",r.t(null,void 0,i(99774))),V=new g.TranslatedString("change legend background visibility",r.t(null,void 0,i(61061))),O=new g.TranslatedString("change legend background transparency",r.t(null,void 0,i(97956))),L=new g.TranslatedString("change volume values visibility",r.t(null,void 0,i(9455))),M=new g.TranslatedString("change symbol field visibility",r.t(null,void 0,i(6091))),x=r.t(null,void 0,i(67369)),G=r.t(null,void 0,i(99487)),R=r.t(null,void 0,i(22519)),W=r.t(null,void 0,i(1111)),A=r.t(null,void 0,i(31326)),F=r.t(null,void 0,i(68791)),z=r.t(null,void 0,i(91322)),N=r.t(null,void 0,i(27331)),E=r.t(null,void 0,i(75991)),H=r.t(null,void 0,i(24248)),j=o.enabled("symbol_info_price_source");var B=i(79807),U=i(99846),I=i(34440),q=i(87172),J=i(35624);const K=o.enabled("show_average_close_price_line_and_label"),Q=new g.TranslatedString("change symbol labels visibility",r.t(null,void 0,i(9402))),X=new g.TranslatedString("change symbol last value visibility",r.t(null,void 0,i(53150))),Y=new g.TranslatedString("change symbol last value mode",r.t(null,void 0,i(28741))),Z=(new g.TranslatedString("change symbol previous close value visibility",r.t(null,void 0,i(12707))),new g.TranslatedString("change bid and ask labels visibility",r.t(null,void 0,i(5100))),new g.TranslatedString("change pre/post market price label visibility",r.t(null,void 0,i(49889))),new g.TranslatedString("change high and low price labels visibility",r.t(null,void 0,i(66805)))),$=new g.TranslatedString("change average close price label visibility",r.t(null,void 0,i(39402))),ee=(new g.TranslatedString("change indicators and financials name labels visibility",r.t(null,void 0,i(59820))),new g.TranslatedString("change indicators name labels visibility",r.t(null,void 0,i(87027)))),te=(new g.TranslatedString("change indicators and financials value labels visibility",r.t(null,void 0,i(90512))),
new g.TranslatedString("change indicators value labels visibility",r.t(null,void 0,i(14922)))),ie=new g.TranslatedString("change no overlapping labels",r.t(null,void 0,i(83935))),ne=new g.TranslatedString("change countdown to bar close visibility",r.t(null,void 0,i(58108))),re=new g.TranslatedString("change currency label visibility",r.t(null,void 0,i(79570))),oe=new g.TranslatedString("change unit label visibility",r.t(null,void 0,i(7011))),le=new g.TranslatedString("change currency and unit labels visibility",r.t(null,void 0,i(88161))),se=new g.TranslatedString("change plus button visibility",r.t(null,void 0,i(50190))),ae=new g.TranslatedString("toggle lock scale",r.t(null,void 0,i(21203))),ce=new g.TranslatedString("change price to bar ratio",r.t(null,void 0,i(69510))),de=new g.TranslatedString("change date format",r.t(null,void 0,i(50457))),ue=new g.TranslatedString("change time hours format",r.t(null,void 0,i(76991))),pe=(new g.TranslatedString("change day of week on labels",r.t(null,void 0,i(7104))),r.t(null,void 0,i(35383))),he=r.t(null,void 0,i(27767)),ve=(r.t(null,void 0,i(40847)),r.t(null,void 0,i(25084)),r.t(null,void 0,i(9654))),ge=(r.t(null,void 0,i(29687)),r.t(null,void 0,i(34905))),ye=(r.t(null,void 0,i(47586)),r.t(null,void 0,i(74823)),r.t(null,void 0,i(95036))),Pe=r.t(null,void 0,i(60971)),fe=r.t(null,void 0,i(42502)),be=r.t(null,void 0,i(94420)),me=r.t(null,void 0,i(94370)),we=r.t(null,void 0,i(50985)),Se=r.t(null,void 0,i(77534)),De=r.t(null,void 0,i(17319)),_e=r.t(null,void 0,i(97378)),Te=r.t(null,void 0,i(53224)),Ce=r.t(null,void 0,i(18219)),ke=r.t(null,void 0,i(64859)),Ve=r.t(null,void 0,i(25209)),Oe=r.t(null,void 0,i(97316)),Le=r.t(null,void 0,i(43637)),Me=(r.t(null,void 0,i(55090)),[{value:U.PriceAxisLastValueMode.LastPriceAndPercentageValue,title:r.t(null,void 0,i(76523))},{value:U.PriceAxisLastValueMode.LastValueAccordingToScale,title:r.t(null,void 0,i(80170))}]);const xe=new g.TranslatedString("change chart background color",r.t(null,void 0,i(99011))),Ge=new g.TranslatedString("change chart background type",r.t(null,void 0,i(72458))),Re=new g.TranslatedString("change vert grid lines color",r.t(null,void 0,i(22722))),We=(new g.TranslatedString("change vert grid lines style",r.t(null,void 0,i(22867))),new g.TranslatedString("change horz grid lines color",r.t(null,void 0,i(88096)))),Ae=(new g.TranslatedString("change horz grid lines style",r.t(null,void 0,i(2523))),
new g.TranslatedString("change sessions breaks visibility",r.t(null,void 0,i(71589)))),Fe=new g.TranslatedString("change sessions breaks color",r.t(null,void 0,i(1579))),ze=new g.TranslatedString("change sessions breaks width",r.t(null,void 0,i(15035))),Ne=new g.TranslatedString("change sessions breaks style",r.t(null,void 0,i(21460))),Ee=new g.TranslatedString("change scales text color",r.t(null,void 0,i(35065))),He=new g.TranslatedString("change scales font size",r.t(null,void 0,i(84382))),je=new g.TranslatedString("change scales lines color",r.t(null,void 0,i(12468))),Be=new g.TranslatedString("change pane separators color",r.t(null,void 0,i(89032))),Ue=new g.TranslatedString("change crosshair color",r.t(null,void 0,i(29951))),Ie=new g.TranslatedString("change crosshair width",r.t(null,void 0,i(37034))),qe=new g.TranslatedString("change crosshair style",r.t(null,void 0,i(92027))),Je=new g.TranslatedString("change symbol watermark visibility",r.t(null,void 0,i(87159))),Ke=new g.TranslatedString("change symbol watermark color",r.t(null,void 0,i(25616))),Qe=new g.TranslatedString("change navigation buttons visibility",r.t(null,void 0,i(35646))),Xe=new g.TranslatedString("change pane buttons visibility",r.t(null,void 0,i(37730))),Ye=new g.TranslatedString("change top margin",r.t(null,void 0,i(98905))),Ze=new g.TranslatedString("change bottom margin",r.t(null,void 0,i(10349))),$e=new g.TranslatedString("change right margin",r.t(null,void 0,i(35636))),et=new g.TranslatedString("change right margin percentage",r.t(null,void 0,i(66601))),tt=r.t(null,void 0,i(27331)),it=r.t(null,void 0,i(70353)),nt=r.t(null,void 0,i(95338)),rt=r.t(null,void 0,i(59827)),ot=r.t(null,void 0,i(37229)),lt=r.t(null,void 0,i(83182)),st=r.t(null,void 0,i(73908)),at=r.t(null,void 0,i(46720)),ct=r.t(null,void 0,i(77705)),dt=r.t(null,void 0,i(74343)),ut=r.t(null,void 0,i(50446)),pt=r.t(null,void 0,i(65994)),ht=r.t(null,void 0,i(91757)),vt=r.t(null,void 0,i(21141)),gt=r.t(null,void 0,i(36014)),yt=r.t(null,void 0,i(16812)),Pt=r.t(null,{context:"unit"},i(50831));var ft=i(54808),bt=i(55262),mt=i(86985),wt=i(51620),St=i(20364);const Dt={symbol:i(77822),legend:i(35885),scales:i(23068),appearance:i(37424),events:i(13168),trading:i(73837)},_t=r.t(null,void 0,i(89053)),Tt=r.t(null,void 0,i(79194)),Ct=r.t(null,void 0,i(43115)),kt=r.t(null,void 0,i(19481)),Vt=(r.t(null,void 0,i(26897)),r.t(null,void 0,i(90801)),r.t(null,void 0,i(70500)),r.t(null,void 0,i(78621)),r.t(null,void 0,i(30973)),!1);const Ot=[{id:"symbol-text-source-description",value:"description",title:r.t(null,void 0,i(29601))},{id:"symbol-text-source-ticker",value:"ticker",title:r.t(null,void 0,i(23097))},{id:"symbol-text-source-ticker-and-description",value:"ticker-and-description",title:r.t(null,void 0,i(82168))}];o.enabled("symbol_info_long_description")&&Ot.push({id:"symbol-text-source-long-description",value:"long-description",title:r.t(null,void 0,i(96073))});class Lt{constructor(e,t,i){this._propertyPages=null,this._maxRightOffsetPropertyObject=null,
this._defaultRightOffsetPercentageWatchedValue=null,this._useRightOffsetPercentageWatchedValue=null,this._profitLossOptions=null,this._isDestroyed=!1,this._availableDateFormatValues=null,this._undoModel=e,this._model=this._undoModel.model(),this._series=this._model.mainSeries(),this._chartWidgetProperties=t,this._options=i,this._seriesPropertyDefinitionViewModel=this._createSeriesViewModel(),this._legendPropertyPage=this._createLegendPropertyPage(),this._scalesPropertyPage=this._createScalesPropertyPage(),this._appearancePropertyPage=this._createAppearancePropertyPage(),this._tradingPropertyPage=this._createTradingPropertyPage(),this._eventsPropertyPage=this._createEventsPropertyPage(),this._series.onStyleChanged().subscribe(this,this._updateDefinitions),this._series.priceScaleChanged().subscribe(this,this._updateDefinitions)}destroy(){var e,t;null!==this._propertyPages&&this._propertyPages.filter(((e,t)=>0!==t)).forEach((e=>{(0,a.destroyDefinitions)(e.definitions.value())})),this._seriesPropertyDefinitionViewModel.destroy(),null===(e=this._pipValueTypeSubscription)||void 0===e||e.unsubscribe(),null===(t=this._availableDateFormatValues)||void 0===t||t.destroy(),this._series.onStyleChanged().unsubscribe(this,this._updateDefinitions),this._series.priceScaleChanged().unsubscribe(this,this._updateDefinitions);(0,n.ensureNotNull)(this._model.timeScale()).maxRightOffsetChanged().unsubscribeAll(this),this._isDestroyed=!0}propertyPages(){return null===this._propertyPages?this._seriesPropertyDefinitionViewModel.propertyPages().then((e=>{if(this._isDestroyed)throw new Error("ChartPropertyDefinitionsViewModel already destroyed");return null===this._propertyPages&&(this._propertyPages=[...e],this._propertyPages.push(this._legendPropertyPage,this._scalesPropertyPage,this._appearancePropertyPage),null!==this._tradingPropertyPage&&this._propertyPages.push(this._tradingPropertyPage),null!==this._eventsPropertyPage&&this._propertyPages.push(this._eventsPropertyPage)),this._propertyPages})):Promise.resolve(this._propertyPages)}_updatePlDisplayOptions(e){(0,n.ensureNotNull)(this._profitLossOptions).setValue([])}_updateDefinitions(){(0,a.destroyDefinitions)(this._scalesPropertyPage.definitions.value());const e=this._createScalesDefinitions();this._scalesPropertyPage.definitions.setValue(e.definitions)}_createSeriesViewModel(){const e={property:this._model.properties().childs().timezone,values:St.availableTimezones.map((e=>({value:e.id,title:e.title})))};return new h.SeriesPropertyDefinitionsViewModel(this._series,this._undoModel,"symbol",_t,Dt.symbol,e)}_createLegendPropertyPage(){const e=this._chartWidgetProperties.childs().paneProperties.childs().legendProperties.childs(),t={property:this._series.properties().childs().statusViewStyle.childs().symbolTextSource,values:Ot},n=function(e,t,n,o,l){const c=[],d=[],u=(0,a.createOptionsPropertyDefinition)({checked:(0,a.convertToDefinitionProperty)(e,t.showSeriesTitle,m),option:(0,a.convertToDefinitionProperty)(e,n.property,w)},{id:"symbolTextSource",title:x,options:new(s())(n.values)})
;if(d.push(u),null!==o){const t=(0,b.combineWithFilteredUpdate)(((t,i)=>"market"===t&&!(0,y.isEconomicSymbol)(e.mainSeries().symbolInfo())),((e,t)=>null!==e),e.mainSeries().marketStatusModel().status(),e.mainSeries().symbolResolvingActive()),i=(0,a.createCheckablePropertyDefinition)({checked:(0,a.convertToDefinitionProperty)(e,o,S),visible:(0,a.convertFromReadonlyWVToDefinitionProperty)(t)},{id:"showOpenMarketStatus",title:E});d.push(i)}const p=(0,a.createCheckablePropertyDefinition)({checked:(0,a.convertToDefinitionProperty)(e,t.showSeriesOHLC,D)},{id:"ohlcTitle",title:G});d.push(p);const h=(0,a.createCheckablePropertyDefinition)({checked:(0,a.convertToDefinitionProperty)(e,t.showBarChange,_)},{id:"barChange",title:R});if(d.push(h),d.push((0,a.createCheckablePropertyDefinition)({checked:(0,a.convertToDefinitionProperty)(e,t.showVolume,L)},{id:"barVolume",title:W})),j){const i=(0,b.combineWithFilteredUpdate)((()=>e.model().symbolSources().some((e=>{var t;return void 0!==(null===(t=e.symbolInfo())||void 0===t?void 0:t.price_source_id)}))),(e=>!e),e.model().symbolSourceResolvingActive(),(0,P.createWVFromGetterAndSubscription)((()=>e.model().symbolSources().length),e.model().symbolSourceCollectionChanged()));d.push((0,a.createCheckablePropertyDefinition)({disabled:(0,a.convertFromReadonlyWVToDefinitionProperty)(e.model().symbolSourceResolvingActive()),checked:(0,a.convertToDefinitionProperty)(e,t.showPriceSource,M),visible:(0,a.convertFromReadonlyWVToDefinitionProperty)(i)},{id:"priceSource",title:H}))}c.push((0,a.createPropertyDefinitionsGeneralGroup)(d,"seriesLegendVisibilityGroup",r.t(null,void 0,i(89053))));const v=[],g=(0,a.createCheckablePropertyDefinition)({checked:(0,a.convertToDefinitionProperty)(e,t.showStudyArguments,T)},{id:"studyArguments",title:F}),B=(0,a.createCheckableSetPropertyDefinition)({checked:(0,a.convertToDefinitionProperty)(e,t.showStudyTitles,C)},{id:"studyTitles",title:A},[g]),U=(0,a.createCheckablePropertyDefinition)({checked:(0,a.convertToDefinitionProperty)(e,t.showStudyValues,k)},{id:"studyValues",title:z}),I=(0,P.createWVFromGetterAndSubscription)((()=>e.model().priceDataSources().some((e=>!(0,f.isActingAsSymbolSource)(e)&&e.showInObjectTree()))),e.model().dataSourceCollectionChanged());v.push(B,U),c.push((0,a.createPropertyDefinitionsGeneralGroup)(v,"studiesLegendVisibilityGroup",r.t(null,void 0,i(61142)),I));const q=[],J=(0,a.createTransparencyPropertyDefinition)({checked:(0,a.convertToDefinitionProperty)(e,t.showBackground,V),transparency:(0,a.convertToDefinitionProperty)(e,t.backgroundTransparency,O)},{id:"legendBgTransparency",title:N});return q.push(J),c.push((0,a.createPropertyDefinitionsGeneralGroup)(q,"generalLegendGroup")),{definitions:c}}(this._undoModel,e,t,this._options.marketStatusWidgetEnabled?v.showMarketOpenStatusProperty:null);return(0,c.createPropertyPage)(n,"legend",Tt,Dt.legend)}_createScalesPropertyPage(){const e=this._createScalesDefinitions();return(0,c.createPropertyPage)(e,"scales",Ct,Dt.scales)}_createScalesDefinitions(){
const e=this._chartWidgetProperties.childs().scalesProperties.childs(),t={property:this._model.properties().childs().priceScaleSelectionStrategyName,values:(0,p.allPriceScaleSelectionStrategyInfo)().map((e=>({value:e.name,title:e.title})))};null===this._availableDateFormatValues&&(this._availableDateFormatValues=new(s())(function(e=!1){const t=new Date(Date.UTC(1997,8,29));return ft.availableDateFormats.map((i=>({value:i,title:new mt.DateFormatter(i,e).format(t)})))}()).spawn());const n={property:bt.dateFormatProperty,values:this._availableDateFormatValues},l={property:wt.timeHoursFormatProperty,values:[{value:"24-hours",title:r.t(null,void 0,i(55838))},{value:"12-hours",title:r.t(null,void 0,i(19648))}]},c=this._model.mainSeriesScaleRatioProperty();return function(e,t,i,n){const r=n.seriesPriceScale.properties().childs(),l=[],c=[],d=[],u=[];if(n.seriesHasClosePrice){const t=(0,a.createCheckablePropertyDefinition)({checked:(0,a.convertToDefinitionProperty)(e,i.showSymbolLabels,Q)},{id:"symbolNameLabel",title:pe}),n=(0,a.createOptionsPropertyDefinition)({checked:(0,a.convertToDefinitionProperty)(e,i.showSeriesLastValue,X),option:(0,a.convertToDefinitionProperty)(e,i.seriesLastValueMode,Y)},{id:"symbolLastValueLabel",title:he,options:new(s())(Me)});c.push(t,n)}const p=t.highLowAvgPrice.childs(),h=(0,a.createCheckablePropertyDefinition)({checked:(0,a.convertToDefinitionProperty)(e,p.highLowPriceLabelsVisible,Z)},{id:"highLowPriceLabels",title:Pe});if(c.push(h),K){const t=(0,a.createCheckablePropertyDefinition)({checked:(0,a.convertToDefinitionProperty)(e,p.averageClosePriceLabelVisible,$)},{id:"averageClosePriceLabel",title:ye});c.push(t)}const v=(0,P.createWVFromGetterAndSubscription)((()=>e.model().priceDataSources().some((e=>!(0,f.isActingAsSymbolSource)(e)&&e.showInObjectTree()))),e.model().dataSourceCollectionChanged());{const t=(0,a.createCheckablePropertyDefinition)({visible:(0,a.convertFromReadonlyWVToDefinitionProperty)(v),checked:(0,a.convertToDefinitionProperty)(e,i.showStudyPlotLabels,ee)},{id:"studyNameLabel",title:ve});c.push(t)}const g=(0,P.createWVFromGetterAndSubscription)((()=>e.model().priceDataSources().some((e=>!(0,f.isActingAsSymbolSource)(e)&&e.showInObjectTree()))),e.model().dataSourceCollectionChanged());{const t=(0,a.createCheckablePropertyDefinition)({visible:(0,a.convertFromReadonlyWVToDefinitionProperty)(g),checked:(0,a.convertToDefinitionProperty)(e,i.showStudyLastValue,te)},{id:"studyLastValueLabel",title:ge});c.push(t)}const y=(0,a.createCheckablePropertyDefinition)({checked:(0,a.convertToDefinitionProperty)(e,r.alignLabels,ie)},{id:"noOverlappingLabels",title:fe});if(c.push(y),l.push((0,a.createPropertyDefinitionsGeneralGroup)(c,"scalesLabelsGroup",be)),n.countdownEnabled){const i=(0,a.createCheckablePropertyDefinition)({checked:(0,a.convertToDefinitionProperty)(e,t.showCountdown,ne)},{id:"countdown",title:me});d.push(i)}if(e.crossHairSource().isMenuEnabled()){const t=(0,a.createCheckablePropertyDefinition)({checked:(0,a.convertToDefinitionProperty)(e,q.addPlusButtonProperty,se)},{
id:"addPlusButton",title:_e});d.push(t)}if(n.currencyConversionEnabled||n.unitConversionEnabled){const t=n.currencyConversionEnabled&&n.unitConversionEnabled?De:n.currencyConversionEnabled?we:Se,i=n.currencyConversionEnabled&&n.unitConversionEnabled?le:n.currencyConversionEnabled?re:oe,r=(0,a.createOptionsPropertyDefinition)({option:(0,a.convertToDefinitionProperty)(e,(0,J.currencyUnitVisibilityProperty)(),i)},{id:"scalesCurrencyUnit",title:t,options:new(s())((0,J.currencyUnitVisibilityOptions)())});d.push(r)}const b=(0,a.createNumberPropertyDefinition)({checked:(0,a.getLockPriceScaleDefinitionProperty)(e,r.lockScale,n.seriesPriceScale,ae),value:(0,a.getScaleRatioDefinitionProperty)(e,n.mainSeriesScaleRatioProperty,ce,[(0,I.limitedPrecision)(7),e=>e])},{id:"lockScale",title:Ce,min:new(s())(n.mainSeriesScaleRatioProperty.getMinValue()),max:new(s())(n.mainSeriesScaleRatioProperty.getMaxValue()),step:new(s())(n.mainSeriesScaleRatioProperty.getStepChangeValue())}),m=(0,a.createOptionsPropertyDefinition)({option:(0,a.getPriceScaleSelectionStrategyDefinitionProperty)(e,n.scalesPlacementPropertyObj.property)},{id:"scalesPlacement",title:Te,options:new(s())(n.scalesPlacementPropertyObj.values)});if(d.push(b,m),l.push((0,a.createPropertyDefinitionsGeneralGroup)(d,"scalesPriceScaleGroup",ke)),o.enabled("scales_date_format")){const t=(0,a.createOptionsPropertyDefinition)({option:(0,a.convertToDefinitionProperty)(e,n.dateFormatPropertyObj.property,de)},{id:"dateFormat",title:Ve,options:n.dateFormatPropertyObj.values});u.push(t)}if(o.enabled("scales_time_hours_format")){const t=(0,a.createOptionsPropertyDefinition)({option:(0,a.convertToDefinitionProperty)(e,n.timeHoursFormatPropertyObj.property,ue)},{id:"timeHoursFormat",title:Oe,options:new(s())(n.timeHoursFormatPropertyObj.values)});u.push(t)}return u.length>0&&l.push((0,a.createPropertyDefinitionsGeneralGroup)(u,"scalesTimeScaleGroup",Le)),{definitions:l}}(this._undoModel,this._series.properties().childs(),e,{disableSeriesPrevCloseValueProperty:this._series.isDWMProperty(),seriesHasClosePrice:this._series.hasClosePrice(),seriesPriceScale:this._series.priceScale(),mainSeriesScaleRatioProperty:c,scalesPlacementPropertyObj:t,dateFormatPropertyObj:n,timeHoursFormatPropertyObj:l,currencyConversionEnabled:this._options.currencyConversionEnabled,unitConversionEnabled:this._options.unitConversionEnabled,countdownEnabled:this._options.countdownEnabled,withWeekdayProperty:void 0})}_createMaxOffsetPropertyObject(){const e=(0,n.ensureNotNull)(this._model.timeScale()),t=new(s())(Math.floor(e.maxRightOffset()));e.maxRightOffsetChanged().subscribe(this,(e=>{t.setValue(Math.floor(e))})),this._maxRightOffsetPropertyObject={value:e.defaultRightOffset(),min:new(s())(0),max:t}}_createDefaultRightOffsetPercentageWatchedValue(){const e=(0,n.ensureNotNull)(this._model.timeScale());this._defaultRightOffsetPercentageWatchedValue=e.defaultRightOffsetPercentage()}_createUseRightOffsetPercentageWatchedValue(){const e=(0,n.ensureNotNull)(this._model.timeScale())
;this._useRightOffsetPercentageWatchedValue=e.usePercentageRightOffset()}_createAppearancePropertyPage(){const e=this._chartWidgetProperties.childs(),t=e.paneProperties.childs(),l=e.scalesProperties.childs(),p=this._model.watermarkSource();let h=null;null!==p&&(h=p.properties().childs());const v={property:d.property(),values:d.availableValues()},g={property:u.property(),values:u.availableValues()},y=this._model.sessions().properties().childs().graphics.childs().vertlines.childs().sessBreaks.childs();null===this._maxRightOffsetPropertyObject&&this._createMaxOffsetPropertyObject(),null===this._defaultRightOffsetPercentageWatchedValue&&this._createDefaultRightOffsetPercentageWatchedValue(),null===this._useRightOffsetPercentageWatchedValue&&this._createUseRightOffsetPercentageWatchedValue();const f=(0,n.ensureNotNull)(this._maxRightOffsetPropertyObject),b=(0,n.ensureNotNull)(this._defaultRightOffsetPercentageWatchedValue),m=(0,n.ensureNotNull)(this._useRightOffsetPercentageWatchedValue),w=function(e,t,n,l,c,d,u,p,h,v,g){const y=[],f=[],b=[],m=[],w=[],S=(0,a.createColorPropertyDefinition)({color:(0,a.getColorDefinitionProperty)(e,t.background,null,xe),gradientColor1:(0,a.getColorDefinitionProperty)(e,t.backgroundGradientStartColor,null,xe),gradientColor2:(0,a.getColorDefinitionProperty)(e,t.backgroundGradientEndColor,null,xe),type:(0,a.convertToDefinitionProperty)(e,t.backgroundType,Ge)},{id:"chartBackground",title:tt,noAlpha:!0}),D=t.vertGridProperties.childs(),_=(0,a.createLinePropertyDefinition)({color:(0,a.getColorDefinitionProperty)(e,D.color,null,Re),style:void 0},{id:"vertGridLine",title:it}),T=t.horzGridProperties.childs(),C=(0,a.createLinePropertyDefinition)({color:(0,a.getColorDefinitionProperty)(e,T.color,null,We),style:void 0},{id:"horizGridLine",title:nt}),k=(0,P.combineProperty)((e=>!e),e.mainSeries().isDWMProperty()),V=(0,a.createLinePropertyDefinition)({visible:(0,B.makeProxyDefinitionPropertyDestroyable)(k),checked:(0,a.convertToDefinitionProperty)(e,c.visible,Ae),color:(0,a.getColorDefinitionProperty)(e,c.color,null,Fe),width:(0,a.convertToDefinitionProperty)(e,c.width,ze),style:(0,a.convertToDefinitionProperty)(e,c.style,Ne)},{id:"sessionBeaks",title:rt}),O=(0,P.createWVFromGetterAndSubscription)((()=>1!==e.model().panes().length),e.model().panesCollectionChanged()),L=(0,a.createLinePropertyDefinition)({visible:(0,a.convertFromReadonlyWVToDefinitionProperty)(O),color:(0,a.getColorDefinitionProperty)(e,t.separatorColor,null,Be)},{id:"paneSeparators",title:st}),M=t.crossHairProperties.childs(),x=(0,a.createLinePropertyDefinition)({color:(0,a.getColorDefinitionProperty)(e,M.color,M.transparency,Ue),width:(0,a.convertToDefinitionProperty)(e,M.width,Ie),style:(0,a.convertToDefinitionProperty)(e,M.style,qe)},{id:"crossHair",title:at});if(y.push(S,_,C,V,L,x),null!==n){const t=(0,a.createColorPropertyDefinition)({checked:(0,a.convertToDefinitionProperty)(e,n.visibility,Je),color:(0,a.getColorDefinitionProperty)(e,n.color,null,Ke)},{id:"watermark",title:ct});y.push(t)}const G=(0,a.createTextPropertyDefinition)({
color:(0,a.getColorDefinitionProperty)(e,l.textColor,null,Ee),size:(0,a.convertToDefinitionProperty)(e,l.fontSize,He)},{id:"scalesText",title:ot}),R=(0,a.createLinePropertyDefinition)({color:(0,a.getColorDefinitionProperty)(e,l.lineColor,null,je)},{id:"scalesLine",title:lt});f.push(G,R);const W=(0,a.createOptionsPropertyDefinition)({option:(0,a.convertToDefinitionProperty)(e,p.property,Qe)},{id:"navButtons",title:dt,options:new(s())(p.values)}),A=(0,a.createOptionsPropertyDefinition)({option:(0,a.convertToDefinitionProperty)(e,h.property,Xe)},{id:"paneButtons",title:ut,options:new(s())(h.values)});b.push(W,A);const F=(0,a.createNumberPropertyDefinition)({value:(0,a.convertToDefinitionProperty)(e,t.topMargin,Ye,[I.floor])},{type:0,id:"paneTopMargin",title:pt,min:new(s())(0),max:new(s())(25),step:new(s())(1),unit:new(s())("%")}),z=(0,a.createNumberPropertyDefinition)({value:(0,a.convertToDefinitionProperty)(e,t.bottomMargin,Ze,[I.floor])},{type:0,id:"paneBottomMargin",title:ht,min:new(s())(0),max:new(s())(25),step:new(s())(1),unit:new(s())("%")});if(m.push(F,z),o.enabled("chart_property_page_right_margin_editor")){const t={value:(0,a.convertFromWVToDefinitionProperty)(e,u.value,$e,[I.floor])},i={type:0,id:"paneRightMargin",title:vt,min:u.min,max:u.max,step:new(s())(1),unit:new(s())(Pt)};if(o.enabled("show_percent_option_for_right_margin")){const n=(0,a.createNumberPropertyDefinition)({...t,checked:(0,a.convertFromWVToDefinitionProperty)(e,g.opposite(),et)},{...i,title:yt}),r=(0,a.createNumberPropertyDefinition)({checked:(0,a.convertFromWVToDefinitionProperty)(e,g,et),value:(0,a.convertFromWVToDefinitionProperty)(e,v,et,[I.floor])},{type:0,id:"paneRightMarginPercentage",title:gt,min:new(s())(0),max:new(s())(99),step:new(s())(1),unit:new(s())("%")});w.push(n),w.push(r)}else{const e=(0,a.createNumberPropertyDefinition)(t,i);m.push(e)}}const N=[(0,a.createPropertyDefinitionsGeneralGroup)(y,"chartBasicStylesAppearanceGroup",r.t(null,void 0,i(88364))),(0,a.createPropertyDefinitionsGeneralGroup)(f,"scalesAppearanceGroup",r.t(null,void 0,i(43115))),(0,a.createPropertyDefinitionsGeneralGroup)(b,"buttonsAppearanceGroup",r.t(null,void 0,i(87845))),(0,a.createPropertyDefinitionsGeneralGroup)(m,"marginsAppearanceGroup",r.t(null,void 0,i(66653)))];return w.length>0&&N.push((0,a.createPropertyDefinitionsGeneralGroup)(w,"rightMarginsAppearanceGroup",r.t(null,void 0,i(40187)))),{definitions:N}}(this._undoModel,t,h,l,y,this._series.isDWMProperty(),f,v,g,b,m);return(0,c.createPropertyPage)(w,"appearance",kt,Dt.appearance)}_createTradingPropertyPage(){return null}_createEventsPropertyPage(){return null}}},37424:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"><path stroke="currentColor" d="M7.5 16.5l-1 1v4h4l1-1m-4-4l2 2m-2-2l9-9m-5 13l-2-2m2 2l9-9m-11 7l9-9m0 0l-2-2m2 2l2 2m-4-4l.94-.94a1.5 1.5 0 0 1 2.12 0l1.88 1.88a1.5 1.5 0 0 1 0 2.12l-.94.94"/></svg>'},13168:e=>{
e.exports='<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M10 4h1v2h6V4h1v2h2.5A2.5 2.5 0 0 1 23 8.5v11a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 5 19.5v-11A2.5 2.5 0 0 1 7.5 6H10V4zm8 3H7.5A1.5 1.5 0 0 0 6 8.5v11A1.5 1.5 0 0 0 7.5 21h13a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 20.5 7H18zm-3 2h-2v2h2V9zm-7 4h2v2H8v-2zm12-4h-2v2h2V9zm-7 4h2v2h-2v-2zm-3 4H8v2h2v-2zm3 0h2v2h-2v-2zm7-4h-2v2h2v-2z"/></svg>'},23068:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"><path stroke="currentColor" d="M10.5 20.5a2 2 0 1 1-2-2m2 2a2 2 0 0 0-2-2m2 2h14m-16-2v-14m16 16L21 17m3.5 3.5L21 24M8.5 4.5L12 8M8.5 4.5L5 8"/></svg>'},35885:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"><path fill="currentColor" d="M6 13h12v1H6zM6 17h12v1H6zM6 21h12v1H6z"/><rect width="17" height="3" stroke="currentColor" rx="1.5" x="5.5" y="6.5"/></svg>'},77822:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M9 7H7v14h2v3h1v-3h2V7h-2V4H9v3zM8 8v12h3V8H8zm9 1h-2v10h2v3h1v-3h2V9h-2V6h-1v3zm-1 1v8h3v-8h-3z"/></svg>'},73837:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M24.068 9a.569.569 0 0 1 .73.872L19 14.842l-5.798-4.97a.569.569 0 0 1 .73-.872l4.751 3.887.317.26.317-.26L24.068 9zm1.47-.67a1.569 1.569 0 0 0-2.103-.104L19 11.854l-4.435-3.628a1.569 1.569 0 0 0-2.014 2.405l6.124 5.249.325.279.325-.28 6.124-5.248a1.569 1.569 0 0 0 .088-2.3zm-11.484 9.728a.57.57 0 0 0 .688-.91L9 12.636l-5.742 4.512a.57.57 0 0 0 .688.91l4.76-3.462.294-.214.294.214 4.76 3.462zm1.446.649a1.57 1.57 0 0 1-2.034.16L9 15.618l-4.466 3.249a1.57 1.57 0 0 1-1.894-2.505l6.051-4.755.309-.243.309.243 6.051 4.755c.74.581.806 1.68.14 2.345z"/></svg>'}}]);