-- Start of DDL Script for Table BM_APP.TEMPLATE
-- Generated 07/05/2017 11:03:20 from BM_APP@logdev

-- Drop the old instance of TEMPLATE
drop table template
/

create table template
    (template_id                    varchar2(100 byte) not null,
    title                          varchar2(100 byte) not null,
    description                    varchar2(500 byte),
    template_code                  CLOB,
    creation_date                  date not null,
    update_date                    date,
    effective_date                 date not null,
    expiration_date                date,
    active                         number,
    template_type                  varchar2(100 byte),
    css                            CLOB,
    template_vars                  CLOB ת
    list_container                 clob)

  insert into template (TEMPLATE_ID, TITLE, DESCRIPTION, TEMPLATE_CODE, CREATION_DATE, UPDATE_DATE, EFFECTIVE_DATE, EXPIRATION_DATE, ACTIVE, TEMPLATE_TYPE, CSS, TEMPLATE_VARS)
values ('CMPTPL', 'Change campaign', 'Long description', '<link href="/digital/css/General_rsp.css" rel="stylesheet" /><link href="/digital/accessible/accessibleCSS.css" rel="stylesheet" type="text/css" />

<div class="packages">
<div class="package_items">
<div class="package pac1" style="z-index: 0;">
                        <h2>{{vars.header}}</h2>
                        <div class="bg_pack">
                            <div class="gb"><span class="super"><span><img src="http://www.pelephone.co.il/digital/UploadImages/mavarim_7-15gb.png" class="" alt="15GB + 7GB îúðä ìùðä"></span></span>22GB</div>

                            <div class="price">
                               <div class="amount"><span>&#8362;</span> {{vars.price}}</div>
                               <div class="period">ìçåãù ìîðåé áøëéùú 2 îðåééí</div>
                            </div>
                            <div class="btn_pack">
                                <a href="https://digital.pelephone.co.il/SelfCare/PeleStoreProgs.do?ptp=68" id="btnp_pack_link_1">
                                    <img class="pink_btn" src="http://www.pelephone.co.il//digital/UploadImages/pink_button_newpelephone_pack.png" id="pink_btnp_1" alt="äöèøôåú ìçáéìä - ôìàôåï Digital Family XL Deal äçãùä" style="display: none;">
                                    <img class="blue_btn" src="http://www.pelephone.co.il/digital/UploadImages/blue_button_newpelephone_pack.png" id="blue_btnp_1" alt="äöèøôåú ìçáéìä - ôìàôåï Digital Family XL Deal äçãùä" style="display: inline;">
                                </a>
                            </div>
                             <div class="dtls" style="height: 0px;"></div>
 <div class="products_inc clearfix" style="height: 130px;" v-for="icon in vars.icons">
                                <div class=""><img :src="icon.pic" alt="Super TV"><span class="tooltip" style="display: none;"><span><img src="http://www.pelephone.co.il/digital/App_Themes/default/images/packages/tooltip_arr.png"><p v-html="icon.title"></p></span>  </span></div>
</div>
                             <div class="products_inc clearfix" style="height: 130px;">
                                <div class=""><img src="http://www.pelephone.co.il//digital/UploadImages/super_tv_74x82.png" alt="Super TV"><span class="tooltip" style="display: none;"><span><img src="http://www.pelephone.co.il/digital/App_Themes/default/images/packages/tooltip_arr.png"><p><strong>Super TV</strong>èìåéæéä 24/7 áôìàôåï ùìê.<br>òøåöé ñôåøè åçãùåú áùéãåø çé.<br>òøåöé éìãéí åúëðé VOD ùì úåëðéåú ðáçøåú.</p></span>  </span></div>
                                <div class=""><img src="http://www.pelephone.co.il//digital/UploadImages/cloud_74x82.png" alt="Cloud"><span class="tooltip" style="display: none;"><span><img src="http://www.pelephone.co.il//digital/App_Themes/default/images/packages/tooltip_arr.png"><p><strong>Cloud</strong>ùîåø òì äîéãò áñîàøèôåï ùìê.<br>âéáåé úîåðåú ñøèéí åàðùé ÷ùø îäîëùéø åîäîçùá äáéúé.</p></span>  </span></div>
                                <div class=""><img src="http://www.pelephone.co.il/digital/UploadImages/musix_74x82.png" alt="Musix"><span class="tooltip" style="display: none;"><span><img src="http://www.pelephone.co.il/digital/App_Themes/default/images/packages/tooltip_arr.png"><p><strong>Musix</strong>ëëä ùåîòéí äéåí îåñé÷ä! <br>îòì îéìéåï ùéøéí áîâååï æ''àðøéí ìäàæðä ììà äâáìä åììà ôøñåîåú. <br>àìôé ôìééìéñèéí ìëì îöá øåç. äîåñé÷ä ùìëí áëì æîï åáëì î÷åí.</p></span>  </span></div>
                                <div class=""><img src="http://www.pelephone.co.il//digital/UploadImages/pelephone_cyber_74x82.png" alt="Pelephone Cyber. ìâìéùä áèåçä áøùú"><span class="tooltip" style="display: none;"><span><img src="/digital/App_Themes/default/images/packages/tooltip_arr.png"><p><strong>Pelephone Cyber. ìâìéùä áèåçä áøùú</strong>àðèéåéøåñ ? äîâï äàéùé ùìê.<br>îâï òì äôìàôåï ùìê 24/7 îåéøåñéí áøùú.</p></span>  </span></div>
                                <div class=""><img src="http://www.pelephone.co.il/digital/UploadImages/shir_74x82.png" alt="ùéø áäîúðä"><span class="tooltip" style="display: none;"><span><img src="/digital/App_Themes/default/images/packages/tooltip_arr.png"><p><strong>ùéø áäîúðä</strong>ìäùîéò ìîé ùîú÷ùø àú äîåæé÷ä ùàúä àåäá.<br> îâååï øçá ùì ùéøéí, äúàîú ùéø ìàéù ÷ùø , äçìôú ùéøéí ììà äâáìä</p></span>  </span></div>
                                <div class=""><img src="http://www.pelephone.co.il/digital/UploadImages/smart_call_74x82.png" alt="Smart Call"><span class="tooltip" style="display: none;"><span><img src="http://www.pelephone.co.il/digital/App_Themes/default/images/packages/tooltip_arr.png"><p><strong>Smart Call</strong>ùéøåú çëí ìñéðåï ùéçåú.<br> ùéøåú çëí äîñðï òáåøê ùéçåú SPAM åùéçåú îèøéãåú.</p></span>  </span></div>
                                <div class="dispno"><img src="/digital/UploadImages/" alt=""><span class="tooltip"><span><img src="http://www.pelephone.co.il/digital/App_Themes/default/images/packages/tooltip_arr.png"><p><strong></strong></p></span>  </span></div>
                                <div class="dispno"><img src="/digital/UploadImages/" alt=""><span class="tooltip"><span><img src="http://www.pelephone.co.il/digital/App_Themes/default/images/packages/tooltip_arr.png"><p><strong></strong></p></span>  </span></div>
                                <div class="dispno"><img src="http://www.pelephone.co.il/digital/UploadImages/" alt=""><span class="tooltip"><span><img src="/digital/App_Themes/default/images/packages/tooltip_arr.png"><p><strong></strong></p></span>  </span></div>
                            </div>
                             <ul class="pack_info" style="height: 153px;">
                                <li v-for="d in vars.desc_items" v-html="d"></li>

                             </ul>
                             <div class="more_info"><a href="javascript:modalIframe(''https://www.pelephone.co.il/digital/3g/corporate/digital/store/packges/unlimited/unlimited2_old/PopupPage,615.aspx'',500,480);" id="more_info_link_1">ìîéãò ðåñó ??</a></div>
                             <div class="pack_terms">

                             </div>
                     </div>
                            </div>
                         </div>
                    </div>', to_date('27-04-2017 12:38:07', 'dd-mm-yyyy hh24:mi:ss'), to_date('07-05-2017 10:19:07', 'dd-mm-yyyy hh24:mi:ss'), to_date('27-04-2017 12:38:07', 'dd-mm-yyyy hh24:mi:ss'), null, 1, 'CMP', '.contentRight{display:none;}
.packages{position:relative;padding-top:0px;clear:both}
.packages .menu_icon{top:0px;z-index:34;right:0px;position:absolute;width:53px;height:53px;float:right;cursor:pointer;}
.packages .storeMenu {position:absolute;z-index:30;display:none;width:298px;float:right;right:0px;top:0px;background-color:#0078BD;}
.packages .storeMenu ul{margin-top:40px}
.packages .storeMenu ul li{margin:10px 0px!important;}
.packages .storeMenu{ margin-top: 0;min-height: 0;}
.packages .package{width:340px;float:right;position:relative}
.packages .package { transition: all 250ms ease-in-out }
.packages .transform { transform: scale(1.1); }
.packages .package_items{display:table;margin:auto;padding-top:30px;color:#0177BD}
.packages .package_items h2{text-align:center;margin-bottom:2px}
.packages .package_items .gb{-webkit-box-shadow: 0px 4px 2px 0px #9A9A9A;box-shadow: 0px 4px 2px 0px #9A9A9A;background:url(''http://www.pelephone.co.il/digital/UploadImages/hul_pack_grd.jpg'') repeat-x ;height:130px;width:100%;-webkit-border-radius: 10px 10px 0px 0;-moz-border-radius: 10px 10px 0px 0;border-radius: 10px 10px 0px 0;color:#fff;text-align:center;font:bold 40px/126px arial;}
.packages .package_items .gb .super{position:relative;float:left}
.packages .package_items .gb .super img{position:absolute;width:auto;left:0px}
.packages .package_items .bg_pack{padding-bottom:20px;border:#E6E6E6 2px solid;-webkit-box-shadow: 1px 1px 8px 1px #E1E5EB;box-shadow: 1px 1px 8px 1px #E1E5EB;background-color:#fff;-webkit-border-radius: 10px;-moz-border-radius: 10px;border-radius: 10px;}
.packages .package_items .dtls{text-align:center;font-size:22px;margin-top:10px;margin-bottom:16px;line-height:24px;font-weight:bold}
.packages .package_items .price{}
.packages .package_items .products_inc{width:80%;margin:10px auto}
.packages .package_items .products_inc div{width:33%;float:right;text-align:center}
.packages .package_items .products_inc img{-webkit-border-radius:14px;-moz-border-radius:14px;border-radius: 14px;width:56px;}
.packages .package_items .price{text-align:center;margin-top:16px;}
.packages .package_items .amount{font-size:40px;}
.packages .package_items .amount span{font-size:32px;}
.packages .package_items .period{font-size:19px;}
.packages .package_items .pack_info{font-size:15px;width:82%;margin:20px auto;height:auto}
.packages .package_items .pack_info li{list-style-type: disc;float:none}
.packages .package_items .btn_pack{text-align:center;margin:10px 0px}
.packages .package_items .btn_pack img{width:200px}
.packages .package_items .more_info{text-align:center;clear:both;}
.packages .package_items .more_info a{color:#0177BD;font-size:15px;}
.packages .package_items .tooltip{position:relative;display:none;z-index:200;height:0px;}
.packages .package_items .tooltip span{right:-70px;top:8px;position:absolute;width:180px;height:auto;-webkit-border-radius:14px;-moz-border-radius:14px;border-radius: 14px;border:#0078bd 2px solid;background-color:#fff}
.packages .package_items .tooltip p{padding:10px;margin:0px;}
.packages .package_items .tooltip strong{display:block}
.packages .package_items .tooltip img {position: absolute;top: -13px;right: 20px;width:33px;}
.packages .main_text{float:right;margin:80px 60px 0 20px}
.packages .pack_terms{margin:10px}
.packages .dispno{display:none}


.packages_b{position:relative;clear:both}
.packages_b .menu_icon{top:38px;z-index:34;right:0px;position:absolute;width:53px;height:53px;float:right;cursor:pointer;}
.packages_b .storeMenu {position:absolute;z-index:30;display:none;width:298px;float:right;right:0px;top:38px;background-color:#0078BD;}
.packages_b .storeMenu ul{margin-top:40px}
.packages_b .storeMenu ul li{margin:10px 0px!important;}
.packages_b .storeMenu{ margin-top: 0;min-height: 0;}
.packages_b .package{margin-bottom:50px;}
.packages_b .pac_terms{margin:10px 20px 0 0;font-size:15px;}

.packages_b .package_items{margin:auto;margin-top:0px;color:#0177BD;}
.packages_b .package_items h2{text-align:right;font:normal 28px arial;margin:4px 0px}
.packages_b .package_items .data_sec{width:610px;float:right;border-left:#fff 10px solid;height:450px;}
.packages_b .package_items .price_sec{width:223px;float:right;}
.packages_b .package_items .gb_sec{float:right;background:url(''/digital/App_Themes/default/images/packages/pac_bg.jpg'') repeat-y ;height:450px;width:327px;color:#fff;text-align:right;}
.packages_b .package_items .price_sec .super{position:relative;float:left}
.packages_b .package_items .price_sec .super img{position:absolute;width:121px;height:115px;left:0px}
.packages_b .package_items .gb_sec .gb1{display:block;font-size:87px;font-weight:bold;margin:172px 30px 0 0}
.packages_b .package_items .gb_sec .gb2{display:block;font-size:80px;font-weight:bold;margin:-27px 60px 0 0}
.packages_b .package_items .bg_pack{height:450px;background-color:#efefef;-webkit-border-radius:14px 0;-moz-border-radius:14px 0;border-radius: 14px 0;}
.packages_b .package_items .dtls{text-align:right;font-size:28px;margin:30px 20px 0px 0px;line-height:34px}
.packages_b .package_items .products_inc{width:96%;margin:30px auto}
.packages_b .package_items .products_inc div{width:15%;float:right}
.packages_b .package_items .products_inc img{-webkit-border-radius:14px;-moz-border-radius:14px;border-radius: 14px;}
.packages_b .package_items .price{text-align:center;margin-top:120px;}
.packages_b .package_items .amount{font-size:35px;}
.packages_b .package_items .amount span{font-size:32px;}
.packages_b .package_items .period{font-size:19px;}
.packages_b .package_items .pack_info{font-size:20px;width:100%;margin:20px auto;height:100%!important}
.packages_b .package_items .pack_info li{list-style-type: disc;float:none}
.packages_b .package_items .btn_pack{text-align:center;margin:10px 0px}
.packages_b .package_items .btn_pack img{width:170px}
.packages_b .package_items .more_info{text-align:right;margin-left:20px;float:left;position:relative;top:400px;}
.packages_b .package_items .more_info a{color:#0177BD;font-size:20px;}
.packages_b .package_items .tooltip{position:relative;display:none;z-index:200;height:0px;}
.packages_b .package_items .tooltip span{right:-70px;top:8px;position:absolute;width:180px;height:auto;-webkit-border-radius:14px;-moz-border-radius:14px;border-radius: 14px;border:#0078bd 2px solid;background-color:#fff}
.packages_b .package_items .tooltip p{padding:10px;margin:0px;}
.packages_b .package_items .tooltip strong{display:block}
.packages_b .package_items .tooltip img {position: absolute;top: -13px;right: 20px;}
.packages_b .dispno{display:none}


/*RSP*/
@media (min-width: 0px) and (max-width: 720px)
{

     .packages .menu_icon{display:none}
     .packages_b .menu_icon{display:none}
     .packages .package_items{width:94%;margin:0px 3%;padding-top:0px;}
     .packages .package{width:100%;margin-bottom:40px;}
     .packages .transform { transform: scale(1); }
     .packages .package_items .tooltip span{width:120px;}
     .packages .package_items .products_inc{width:90%}
     .packages .main_text{margin-top:0px;margin-right:10px;}
     .packages .package_items h2{margin-bottom:6px;}
     .packages .package_items .products_inc div{text-align:center}
     .packages .package_items .price{margin-top:20px;}
     .packages .package_items .period{margin-top:-10px;}
    /* .packages .package_items .gb .super img{height:150px}*/
     .packages .package_items .gb{font-size:50px;}

      .packages_b .package{clear:both;}
      .packages_b .package_items .gb_sec{width:40%}
      .packages_b .package_items .data_sec{width:60%;border-left:none}
      .packages_b .package_items .price_sec{display:block;width:100%;margin-bottom:0px;background-color: #f0efef;height:96px; }
      .packages_b .package_items .price{margin-top:10px;}
      .packages_b .package_items h2{text-align:center;font-size:22px;}
      .packages_b .package_items .tooltip span{width:120px;right:-120px}
      .packages_b .package_items .products_inc img{width:50px}
      .packages_b .package_items .products_inc div{width:33%}
      .packages_b .package_items .products_inc{width:188px;margin-top:-10px;margin-bottom:6px;margin-right:0px;margin-left:0px;}
      .packages_b .package_items .gb_sec{background-image:none}
      .packages_b .package_items .bg_pack{background:#f0efef url(''/digital/App_Themes/default/images/packages/pac_bg.jpg'') right top no-repeat;background-size:44% 100%;clear:both;height:360px}
      .packages_b .package_items .dtls{font-size:18px;line-height:26px;margin-top:10px;margin-right:0%;position:relative;top:-24px;clear:both}
      .packages_b .package_items .gb_sec .gb1{font-size:32px;margin-right:0px;margin-top:140px;text-align:center}
      .packages_b .package_items .gb_sec .gb2{font-size:50px;margin-right:13%;margin-top:-15px;}
      .packages_b .package_items .price{width:35%;float:right}
      .packages_b .package_items .btn_pack{width:55%;float:right;text-align:right;margin-top:20px;margin-right:2%;}
      .packages_b .package_items .btn_pack img{width:130px;}
      .packages_b .package_items .price_sec .super img{width:100px;height:95px}
      .packages_b .package_items .period{margin-top:-10px;}
      .packages_b .pac_terms{margin:0px;font-size:13px;margin-right:30px;}
      .packages_b .package_items .pack_info{font-size:17px;margin-top:10px;margin-bottom:10px;margin-right:10px;margin-left:0px;width:90%;-webkit-box-sizing: border-box; -moz-box-sizing: border-box;   box-sizing: border-box;padding-right:12px;}
      .packages_b .package_items .bg_pack{-webkit-border-radius: 0;-moz-border-radius:0;border-radius:0;}
       .packages_b .package_items .more_info{top:326px;}
      .packages_b .package_items .more_info a{font-size:17px;margin-left:10px;float:left}
      .packages_b .package_items .tooltip span{width:120px;}
      .packages_b .package_items .tooltip img{width:33px;right:70px;}

        @media screen and (orientation:landscape) {
         .packages_b  .gb1{font-size:48px!important;}
         .packages .package_items .gb{background-image:none;background-color:#015f9c}


     }
     @media screen and (orientation:portrait) {

     }
    .tilesResponsive a{height:44px;}
    .left_holder{width:100%;padding:0px;-webkit-box-sizing: border-box; -moz-box-sizing: border-box;   box-sizing: border-box;overflow:hidden  }
    .contentMain{overflow:hidden}
}

@media (min-width: 0px) and (max-width: 340px)
{
}
.pagesWrapper .content .contentBredcrams span ul li a:hover{text-decoration:none}
.pagesWrapper .content .contentLeft{width:100%;max-width:100%;min-width:100%}
', '[
{ "var":"header" ,
    "rules" : { "required":true },
    "title": "ùí úåëðéú"
    },
{ "var":"price" ,
   "title": "îçéø"
    },

{ "var":"desc_items" ,
    "type" : "list",
    "rules" : { "required":true },
    "title": "ôéøåè úåëðéú"
} ,
{ "var":"icons" ,
    "type" : "objects",
    "keys":{"pic":"ëúåáú úîåðä","title":"èééèì","alt":"ALT"},
    "rules" : { "required":true },
    "title": "ôéøåè àéé÷åðéí"
}
]');

insert into template (TEMPLATE_ID, TITLE, DESCRIPTION, TEMPLATE_CODE, CREATION_DATE, UPDATE_DATE, EFFECTIVE_DATE, EXPIRATION_DATE, ACTIVE, TEMPLATE_TYPE, CSS, TEMPLATE_VARS)
values ('CMP2', 'dsdsdsd', 'dsdsdsdsd', '{{name}}', to_date('27-04-2017 16:02:28', 'dd-mm-yyyy hh24:mi:ss'), null, to_date('27-04-2017 16:02:28', 'dd-mm-yyyy hh24:mi:ss'), null, 1, 'CMP', 'dsdsds', '[
{ "var":"campain_name" ,
    "rules" : { "required":true },
    "title": "ùí úåëðéú"
    },
{ "var":"price" ,
   "title": "îçéø"
    },

{ "var":"desc_items" ,
    "type" : "list",
    "rules" : { "required":true },
    "title": "ôéøåè úåëðéú"
}
]');
