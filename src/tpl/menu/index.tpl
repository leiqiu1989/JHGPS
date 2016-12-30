<ul class="nav nav-list">
    <% 
        for(var i=0;i< data.length;i++) {
            var subMenus= data[i];
            if(subMenus.length > 0) {
                var icon= subMenus[0].icon;
                var name= subMenus[0].name;
    %>
    <li>
        <a href="javascript:" class="dropdown-toggle">
            <i class="menu-icon <%= icon %>"></i>
            <span class="menu-text"><%= name %></span>
        </a>        
        <ul class="submenu">
            <% 
                for(var j=0;j<subMenus.length;j++) {
                    var item= subMenus[j];
             %>
            <li>
                <a href="<%= item.url %>"><%= item.name %></a>
            </li>
            <% } %>
        </ul>
    </li>
    <% }
    } %>
</ul>