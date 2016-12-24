define(function(require, exports, module) {
    'use strict';

    //datapicker
    var datapicker = require('datepicker');
    //dialog
    var dialog = require('dialog');
    var api = require('api');
    var page = require('page');
    require('lodash');
    require('chosen');

    /*js对象扩展*/
    Date.prototype.format = function(format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    };

    /**********template helper 公共方法***********/
    template.helper('deviceFaultProcessDesc', function(key) {
        var processDesc = '';
        switch (key) {
            case 1:
                processDesc = '未处理';
                break;
            case 2:
                processDesc = '正在处理';
                break;
            case 3:
                processDesc = '处理完成';
                break;
            default:
                break;
        }
        return processDesc;
    });
    template.helper('userStatus', function(key) {
        return key == 0 ? '停用' : key == 1 ? '启用' : '';
    });
    template.helper('carStatus', function(key) {
        return !key ? '' : key == 1 ? '在线' : '离线';
    });
    template.helper('sellChannel', function(key) {
        return !key ? '' : key == 1 ? '管理版' : '运营管理平台';
    });
    template.helper('sliceDate', function(date) {
        return date ? date.slice(0, 10) : '';
    });
    template.helper('GPSID', function(key) {
        return !key ? '' : key.substr(key.length - 7);
    });
    template.helper('plateNumberColorDesc', function(key) {
        return key == 1 ? '蓝牌' : '黄牌';
    });
    template.helper('formateDate', function(key, format) {
        format = format || 'yyyy/MM/dd';
        return !key ? '' : new Date(key).format(format);
    });
    template.helper('dateTimeCls', function(key) {
        var currentTime = Date.parse(new Date());
        if (!key) {
            return '';
        } else {
            var keyTime = 0;
            if (_.isString(key)) {
                keyTime = Date.parse(key.replace(/-/g, "/"));
            } else {
                keyTime = Date.parse(key);
            }
            return keyTime < currentTime ? 'red' : '';
        }
    });

    /*公共js*/
    var common = {
        // 初始化日期
        initDateTime: function(el, formatStyle, hasDefValue, timePickerBool, minDate, maxDate) {
            formatStyle = formatStyle || 'Y/m/d H:i';
            var currentDate = new Date().format('yyyy/MM/dd H:m');
            timePickerBool = (timePickerBool === undefined || timePickerBool === null) ? true : timePickerBool;
            var opts = {
                lang: 'ch',
                defaultDate: hasDefValue ? currentDate : null,
                timepicker: timePickerBool,
                format: formatStyle,
                minDate: minDate || false,
                maxDate: maxDate || false
            };
            $(el).datetimepicker(opts);
        },
        // 检查日期
        checkTime: function(dateTime, ct, interVals) {
            if (!dateTime || !ct) {
                common.toast('日期不能为空！');
                return false;
            }
            if (_.isString(ct)) {
                dateTime = Date.parse(dateTime.replace(/-/g, "/"));
            } else {
                dateTime = Date.parse(dateTime);
            }
            if (_.isString(ct)) {
                ct = Date.parse(ct.replace(/-/g, "/"));
            } else {
                ct = Date.parse(ct);
            }
            var times = interVals * 24 * 60 * 60 * 1000;
            var diffTimes = dateTime - ct;
            if (diffTimes < 0 || diffTimes > times) {
                common.toast('时间周期必须小于或等于3天!');
                return false;
            }
            return true;
        },
        // 初始化下拉框
        initSelect: function(el, extendOpt, callback, selectedValue, options) {
            options = options || {};
            var defaultOpt = {
                width: '160px',
                placeholder_text_single: '请选择...',
                no_results_text: '未找到匹配项',
                disable_search_threshold: 6,
                search_contains: true,
                allow_single_deselect: true,
            };

            if (_.isNumber(selectedValue)) selectedValue += '';

            var selValArray = selectedValue ? selectedValue.split('|') : [];

            if (extendOpt && _.isObject(extendOpt)) {
                var html = '';
                for (var item in extendOpt) {
                    html += '<option value="' + item + '">' + extendOpt[item] + '</option>';
                }
                $(el).append(html);
                if (selValArray.length > 1) {
                    for (var i = 0; i < selValArray.length; i++) {
                        var value = selValArray[i];
                        $(el).children(" option[value='" + value + "']").attr('selected', true);
                    }
                }
            }
            if (_.isObject(options)) defaultOpt = $.extend(true, defaultOpt, options);

            if (selValArray.length === 1) {
                $(el).on('chosen:ready', function(evt, params) {
                    $(el).val(selectedValue);
                    $(el).trigger('chosen:updated');
                });
            }
            $(el).chosen(defaultOpt);
            $(el).on('change', function(evt, params) {
                if (callback) callback(params);
            });
        },
        // 区间日期,intervals间隔的天数
        initBetweenDateTime: function(startEl, endEl, interVals) {
            var currentDate = new Date().format('yyyy/MM/dd H:m');
            var opts = {
                lang: 'ch',
                timepicker: true,
                format: 'Y/m/d H:i'
            };
            var startOpts = $.extend({}, opts, {
                maxDate: currentDate,
                // onChangeDateTime: function(ct, $input) {
                //     var endTime = $(endEl).val();
                //     common.checkTime(endTime, ct, interVals);
                // }
            });
            var endOpts = $.extend({}, opts, {
                maxDate: currentDate,
                // onChangeDateTime: function(ct, $input) {
                //     var startTime = $(startEl).val();
                //     common.checkTime(ct, startTime, interVals);
                // }
            });
            $(startEl).datetimepicker(startOpts);
            $(endEl).datetimepicker(endOpts);
        },
        dialog: function(content, opts) {
            dialog(content, $.extend({
                mask: true,
                titleClose: true
            }, opts));
        },
        // 自适应高度的dialog
        autoAdaptionDialog: function(content, opts, callback) {
            opts = _.isObject(opts) ? opts : {};
            var option = $.extend({}, {
                mask: true,
                titleClose: true,
                init: function() {
                    if (callback) callback(this);
                },
                buttons: []
            }, opts);
            dialog(content, option);
            // 通过js更改样式
            $('.pop-content.alert .content').css({
                'min-height': 0
            });
            $('.pop-content.alert .title').css({
                'text-align': 'left'
            });
        },
        // 通知提示
        toast: function(content, type) {
            type = type || 'error';
            var isSuccess = type === 'success';
            var textCls = isSuccess ? 'toastCls toastCls-success' : 'toastCls';
            var iconCls = isSuccess ? 'fa fa-check-square' : 'fa fa-exclamation-circle';
            var contentHtml = '<div class="' + textCls + '"><i class="' + iconCls + '"></i><span>' + content + '</span></div>';
            dialog(contentHtml, {
                type: 'toast',
                toastTime: 2000
            });
        },
        // alert对话框(内容，类型，是否有确定按钮，按钮回调函数)
        alert: function(content, type, hasOK, callback) {
            hasOK = hasOK || false;
            type = type || 'success';
            var isSuccess = type === 'success';
            var textCls = isSuccess ? 'alertCls-success' : 'alertCls-error';
            var iconCls = isSuccess ? 'fa fa-check-square' : 'fa fa-exclamation-circle';
            var contentHtml = '<div class="' + textCls + '"><i class="' + iconCls + '"></i><span>' + content + '</span></div>';
            dialog(contentHtml, {
                buttons: hasOK ? [{
                    name: '确 定',
                    callback: function(d) {
                        if (callback) callback();
                        d.close();
                    }
                }] : []
            });
            // 通过js更改样式
            $('.pop-content.alert .content').css({
                'margin-top': 0,
                'min-height': 0,
                'padding': 0
            });
        },
        // 序列化参数
        serialParam: function(data) {
            var str = '';
            if (data && _.isObject(data)) {
                $.each(data, function(key, value) {
                    str += key + '=' + value + '&';
                });
            }
            return str.substring(0, str.length - 1);
        },
        // 更改hash
        changeHash: function(url, param) {
            window.location.hash = url + this.serialParam(param);
        },
        // 清除locationStorage
        clearData: function() {
            common.removeLocationStorage('carSearchParams');
            common.removeLocationStorage('gpsSearchParams');
            common.removeLocationStorage('deviceFaultSearchParams');
            common.removeLocationStorage('tplSearchParams');
        },
        // 根据key获取查询条件，param:历史查询参数(传递true则更新为新的查询参数)，
        // newParam：新的查询参数，hasDefaultPage：参数默认传递page参数，默认为true
        getParams: function(key, param, newParam, hasDefaultPage) {
            hasDefaultPage = _.isBoolean(hasDefaultPage) ? hasDefaultPage : true;
            var searchParam = {};
            if (_.isBoolean(param) && param) {
                searchParam = newParam;
            } else {
                var strlocalStorageParam = common.getlocationStorage(key);
                var localStorageParam = JSON.parse(strlocalStorageParam);
                if (param && _.isObject(param) && !_.isEmpty(param)) {
                    searchParam = param;
                } else if (strlocalStorageParam && _.isObject(localStorageParam) && !_.isEmpty(localStorageParam)) {
                    searchParam = localStorageParam;
                }
            }
            if (!_.isEmpty(searchParam)) {
                searchParam.pageNumber = searchParam.pageNumber || 1;
                searchParam.pageSize = 20;
            } else {
                if (hasDefaultPage) {
                    searchParam.pageNumber = 1;
                    searchParam.pageSize = 20;
                }
            }
            return searchParam;
        },
        // 公共函数
        page: function(totalCount, pageSize, currPage, callback, el) {
            totalCount = totalCount || 0;
            pageSize = pageSize || 20;
            currPage = currPage || 1;
            el = el || '#page';
            if (_.isString(pageSize)) {
                pageSize = parseInt(pageSize);
                if (_.isNaN(pageSize)) pageSize = 20;
            }
            if (_.isString(currPage)) {
                currPage = parseInt(currPage);
                if (_.isNaN(currPage)) currPage = 1;
            }
            page.init({
                $dom: $(el),
                totalPage: Math.ceil((totalCount / pageSize) > 1 ? (totalCount / pageSize) : 1),
                totalNumber: totalCount,
                currentPage: currPage,
                callback: function(page) {
                    if (callback && _.isFunction(callback)) callback(page);
                }
            });
        },
        // confirm确认框
        confirm: function(content, callback) {
            var contentHtml = '<div class="confirmCls">' + content + '</div>';
            dialog(contentHtml, {
                type: 'confirm',
                title: '提 示',
                titleClose: true,
                buttons: [{
                    name: '确 定',
                    callback: function(d) {
                        if (callback) callback();
                        d.close();
                    }
                }, {
                    name: '取 消',
                    callback: function(d) {
                        d.close();
                    }
                }]
            });
            // 通过js更改样式
            $('.pop-content.confirm .content').css({
                'min-height': 0
            });
        },
        // 遮罩层
        loading: function(status, content) {
            content = content || '加载中...';
            status = status || 'hide';
            if ($('#glb_loading').size() < 1) {
                $('<div id="glb_loading">' + content + '</div>').appendTo('body');
            }
            if (status === 'show') {
                $('#glb_loading').show();
            } else {
                $('#glb_loading').hide();
            }
        },
        // set cookie
        setCookie: function(name, value, expireDay) {
            expireDay = expireDay || 7;
            $.cookie(name, value, {
                expires: expireDay
            });
        },
        // get cookie
        getCookie: function(name) {
            return $.cookie(name);
        },
        // set locationStorage
        setlocationStorage: function(key, value) {
            window.localStorage.setItem(key, value);
        },
        // get locationStorage
        getlocationStorage: function(key) {
            return window.localStorage.getItem(key);
        },
        // remove locationStorage
        removeLocationStorage: function(key) {
            window.localStorage.removeItem(key);
        },
        getElValue: function(el, type) {
            type = type || 'value';
            if (type === 'value') {
                return $.trim($(el).val());
            } else {
                return $.trim($(el).text());
            }
        },
        setElValue: function(el, value) {
            $(el).val(value);
        },
        // 获取表单提交数据
        getFormData: function(el) {
            var inputs = $(el).find(':input').not('[data-nosubmit="true"]');
            var formData = {};
            $(inputs).each(function(index, input) {
                var name = null,
                    value = null;
                name = $(input).attr('name');
                if (name) {
                    if ($(input).is(':checkbox')) {
                        var isChecked = $(input).is(':checked');
                        value = isChecked ? $(input).data('chkvalue') : $(input).data('unchkvalue');
                    } else if ($(input)[0].tagName === 'SELECT') {
                        value = $(input).children('option:selected').val();
                    } else {
                        value = $(input).val();
                    }
                    formData[name] = value;
                }
            });
            return formData;
        },
        setFormData: function(el, data) {
            if (data && !$.isEmptyObject(data)) {
                var inputs = $(el).find(':input');
                var name = null;
                $(inputs).each(function(index, input) {
                    name = $(input).attr('name');
                    if (name) {
                        if ($(input)[0].tagName === 'SELECT') {
                            $(input).val(data[name]);
                        } else {
                            $(input).val(data[name]);
                        }
                    }
                });
            }
        },
        simpleAjax: function(url, param) {
            var me = this;
            param = param || {};
            param.sid = this.getCookie('sid');
            param.st = this.getCookie('st');
            return $.ajax({
                type: "POST",
                url: url,
                data: param,
                dataType: 'json',
                cache: false
            });
        },
        getBundle: function() {
            var urls = Array.prototype.slice.call(arguments);
            var requests = $.map(urls, function(item) {
                if (_.isString(item)) {
                    return $.get(item);
                } else {
                    return item.done ? item : $.get(item.url, item.data);
                }
            });
            var deferred = $.Deferred();
            $.when.apply($, requests).done(function() {
                var args = _.toArray(arguments);
                var result = _.map(args, function(prop) {
                    return _.isArray(prop) ? (prop[1] === 'success' ? prop[0] : prop) : prop;
                });
                deferred.resolve.apply(deferred, result);
            }).fail(function() {
                deferred.reject(arguments);
            });
            return deferred.promise();
        },
        // ajax封装
        ajax: function(url, param, callback, opts) {
            var me = this;
            param = param || {};
            opts = opts || {};
            return $.ajax({
                type: "POST",
                url: url,
                data: param,
                dataType: 'json',
                cache: false,
                success: function(res) {
                    if (callback && typeof callback === 'function') {
                        callback.call(this, res);
                    }
                    // if (res.status == 'ERROR') {
                    //     if (!me.sessionExpire) {
                    //         me.sessionExpire = true;
                    //         me.alert(res.errorMsg, 'error', true, function() {
                    //             me.loading();
                    //             me.clearData();
                    //             window.location.hash = '#login/login';
                    //         });
                    //     }
                    // } else {
                    //     me.sessionExpire = false;
                    // }
                },
                //若异常，则弹窗提示
                error: function(xmlHttpRequest) {
                    if (opts.action === 'login') {
                        $('#btn-login').removeAttr('disabled', 'disabled');
                    } else {
                        me.loading();
                        me.toast('请求失败，请联系管理员！');
                        // 如果sid，st为null，则跳转到登录页
                        var sid = me.getCookie('sid');
                        var st = me.getCookie('st');
                        if (!sid || !st) {
                            me.clearData();
                            window.location.hash = '#login/login';
                        }
                    }
                }
            });
        },
        // 所属机构-查询公共组件(callback代表选择了某一项的回调函数)
        listenOrganization: function(callback) {
            var me = this;
            $('#main-content').off()

            .on('input propertychange', 'input[name="orgName"]', function(e) {
                var value = $.trim($(this).val());
                common.setElValue(':hidden[name="orgId"]', '');
                if (value.length >= 3) {
                    me.getOrganizationList(value);
                }
            }).on('click', 'ul.ul-select a', function() {
                var orgId = $(this).data('orgid');
                var orgName = $(this).data('name');
                common.setElValue(':hidden[name="orgId"]', orgId);
                common.setElValue('input[name="orgName"]', orgName);
                $(this).closest('ul.ul-select').addClass('hidden');
                callback && callback(orgId, orgName);
            });
        },
        // 所属机构-查询结果列表
        getOrganizationList: function(value) {
            value = $.trim(value);
            if (!value || value.length < 3) {
                common.toast('至少输入3个字符进行搜索');
                $('input[name="orgName"]').focus();
                return false;
            }
            common.ajax(api.carManager.orgList, {
                companyName: value
            }, function(res) {
                if (res.status === 'OK') {
                    var data = res.content;
                    var html = '';
                    if (data && data.length > 0) {
                        $.each(data, function(i, item) {
                            html += '<li><a href="javascript:" data-name="' + item.fullName + '" data-orgid="' + item.orgId + '">' + item.fullName + '</a></li>';
                        });
                    } else {
                        html = '<li><span>未找到相关数据项！</span></li>';
                    }
                    $('ul.ul-select').removeClass('hidden').empty().html(html);
                }
            });
        },
        tableSort: function(callback) {
            var me = this;
            $('.datatable-header').on('click', 'th.sortable', function() {
                var field = $(this).data('sortfield');
                var order = $(this).data('sortorder');
                order = order || 'asc';
                $(this).data('sortorder', order === 'asc' ? 'desc' : 'asc');
                var params = {
                    sortField: field,
                    sortType: order
                };
                if ($('.datatable-content tbody > tr').size() < 1) {
                    return false;
                }
                if (order === 'asc') {
                    $(this).removeClass('asc').addClass('desc');
                } else {
                    $(this).removeClass('desc').addClass('asc');
                }
                if (callback) callback(params);
            });
        }
    };
    return common;
});