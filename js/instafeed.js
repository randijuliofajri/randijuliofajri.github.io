(function(a){function b(a){return a.replace(/[&<>"'`=\/]/g,function(a){return f[a]})}function c(a,b){return"undefined"!=typeof a.node.edge_media_to_caption.edges[0]&&"undefined"!=typeof a.node.edge_media_to_caption.edges[0].node&&"undefined"!=typeof a.node.edge_media_to_caption.edges[0].node.text&&null!==a.node.edge_media_to_caption.edges[0].node.text?a.node.edge_media_to_caption.edges[0].node.text:"undefined"!=typeof a.node.title&&null!==a.node.title&&0!=a.node.title.length?a.node.title:"undefined"!=typeof a.node.accessibility_caption&&null!==a.node.accessibility_caption&&0!=a.node.accessibility_caption.length?a.node.accessibility_caption:(this.is_tag?b.name:b.username)+" image "}var d={host:"https://www.instagram.com/",username:"",tag:"",container:"",display_profile:!0,display_biography:!0,display_gallery:!0,display_captions:!1,display_igtv:!1,callback:null,styling:!0,items:8,items_per_row:4,margin:.5,image_size:640,lazy_load:!1,on_error:console.error},e={150:0,240:1,320:2,480:3,640:4},f={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};a.instagramFeed=function(f){var g=a.fn.extend({},d,f);if(""==g.username&&""==g.tag)return g.on_error("Instagram Feed: Error, no username nor tag defined.",1),!1;if("undefined"!=typeof g.get_data&&console.warn("Instagram Feed: options.get_data is deprecated, options.callback is always called if defined"),null==g.callback&&""==g.container)return g.on_error("Instagram Feed: Error, neither container found nor callback defined.",2),!1;var h=""==g.username,i=h?g.host+"explore/tags/"+g.tag+"/":g.host+g.username+"/";return a.get(i,function(d){try{d=d.split("window._sharedData = ")[1].split("</script>")[0]}catch(a){return void g.on_error("Instagram Feed: It looks like the profile you are trying to fetch is age restricted. See https://github.com/jsanahuja/InstagramFeed/issues/26",3)}if(d=JSON.parse(d.substr(0,d.length-1)),d=d.entry_data.ProfilePage||d.entry_data.TagPage,"undefined"==typeof d)return void g.on_error("Instagram Feed: It looks like YOUR network has been temporary banned because of too many requests. See https://github.com/jsanahuja/jquery.instagramFeed/issues/25",4);if(d=d[0].graphql.user||d[0].graphql.hashtag,""!=g.container){var f,j="";if(g.styling){var k=(100-2*g.margin*g.items_per_row)/g.items_per_row;f={profile_container:" style=\"text-align:center;\"",profile_image:" style=\"border-radius:10em;width:15%;max-width:125px;min-width:50px;\"",profile_name:" style=\"font-size:1.2em;\"",profile_biography:" style=\"font-size:1em;\"",gallery_image:" style=\"width:100%;\"",gallery_image_link:" style=\"width:"+k+"%; margin:"+g.margin+"%;position:relative; display: inline-block; height: 100%;\""},g.display_captions&&(j+="<style>                            a[data-caption]:hover::after {                                content: attr(data-caption);                                text-align: center;                                font-size: 0.8rem;                                color: black;                                position: absolute;                                left: 0;                                right: 0;                                bottom: 0;                                padding: 1%;                                max-height: 100%;                                overflow-y: auto;                                overflow-x: hidden;                                background-color: hsla(0, 100%, 100%, 0.8);                            }                        </style>")}else f={profile_container:"",profile_image:"",profile_name:"",profile_biography:"",gallery_image:"",gallery_image_link:""};g.display_profile&&(j+="<div class=\"instagram_profile\""+f.profile_container+">",j+="<img class=\"instagram_profile_image\" src=\""+d.profile_pic_url+"\" alt=\""+(h?d.name+" tag pic":d.username+" profile pic")+"\""+f.profile_image+(g.lazy_load?" loading=\"lazy\"":"")+" />",j+=h?"<p class=\"instagram_tag\""+f.profile_name+"><a href=\"https://www.instagram.com/explore/tags/"+g.tag+"\" rel=\"noopener\" target=\"_blank\">#"+g.tag+"</a></p>":"<p class='instagram_username'"+f.profile_name+">@"+d.full_name+" (<a href='https://www.instagram.com/"+g.username+"' rel='noopener' target='_blank'>@"+g.username+"</a>)</p>",!h&&g.display_biography&&(j+="<p class='instagram_biography'"+f.profile_biography+">"+d.biography+"</p>"),j+="</div>");var l="undefined"==typeof e[g.image_size]?e[640]:e[g.image_size];if(g.display_gallery)if("undefined"!=typeof d.is_private&&!0===d.is_private)j+="<p class=\"instagram_private\"><strong>This profile is private</strong></p>";else{var m=(d.edge_owner_to_timeline_media||d.edge_hashtag_to_media).edges;t=m.length>g.items?g.items:m.length,j+="<div class='instagram_gallery'>";for(var n=0;n<t;n++){var o,p,q="https://www.instagram.com/p/"+m[n].node.shortcode,r=b(c(m[n],d));switch(m[n].node.__typename){case"GraphSidecar":p="sidecar",o=m[n].node.thumbnail_resources[l].src;break;case"GraphVideo":p="video",o=m[n].node.thumbnail_src;break;default:p="image",o=m[n].node.thumbnail_resources[l].src;}j+="<a href=\""+q+"\""+(g.display_captions?" data-caption=\""+r+"\"":"")+" class=\"instagram-"+p+"\" rel=\"noopener\" target=\"_blank\""+f.gallery_image_link+">",j+="<img"+(g.lazy_load?" loading=\"lazy\"":"")+" src=\""+o+"\" alt=\""+r+"\""+f.gallery_image+" />",j+="</a>"}j+="</div>"}if(g.display_igtv&&"undefined"!=typeof d.edge_felix_video_timeline){var s=d.edge_felix_video_timeline.edges,t=s.length>g.items?g.items:s.length;if(0<s.length){j+="<div class=\"instagram_igtv\">";for(var n=0;n<t;n++){var q="https://www.instagram.com/p/"+s[n].node.shortcode,r=b(c(s[n],d));j+="<a href=\""+q+"\""+(g.display_captions?" data-caption=\""+r+"\"":"")+" rel=\"noopener\" target=\"_blank\""+f.gallery_image_link+">",j+="<img"+(g.lazy_load?" loading=\"lazy\"":"")+" src=\""+s[n].node.thumbnail_src+"\" alt=\""+r+"\""+f.gallery_image+" />",j+="</a>"}j+="</div>"}}a(g.container).html(j)}null!=g.callback&&g.callback(d)}).fail(function(a){g.on_error("Instagram Feed: Unable to fetch the given user/tag. Instagram responded with the status code: "+a.status,5)}),!0}})(jQuery);
