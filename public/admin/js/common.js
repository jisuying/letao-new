$(function () {
    //功能1:点击分类,切换二级菜单的显示和隐藏
    $('.second').prev().on('click', function () {
        $(this).next().toggle();
    })
    //2.点击三横,左侧隐藏,右侧跟随
    $('.ani').on('click', function () {
        $('.lt-aside , .lt-right .right-head, .lt-right').toggleClass('active')
    })
    //3.点击退出,显示模态框
    $('.back').on('click', function () {
        $('#myModal').modal('show');
    })
    //4.点击确定按钮,退出模态框
    $('.submit').on('click', function () {
        $.ajax({
            url: '/employee/employeeLogout',
            type: 'get',
            success: function (info) {  
                if (info.success) {
                    $('#myModal').modal('hide');
                    location.href = 'login.html';
                }
            }
        })
    })

    //渲染分页插件
    function pag(info, render) {
        $("#paginator").bootstrapPaginator({
            bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
            currentPage: info.page,//当前页
            totalPages: Math.ceil(info.total / 5),//总页数
            size: "small",//设置控件的大小，mini, small, normal,large
            onPageClicked: function (event, originalEvent, type, page) {
                //为按钮绑定点击事件 page:当前点击的按钮值
                render(page);
            }
        });
    }
    window.pag = pag;

})