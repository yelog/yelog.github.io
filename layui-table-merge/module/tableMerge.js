/**
 * Created by YujieYang.
 * @name:  子表格扩展
 * @author: 杨玉杰
 */
layui.define(['table'], function (exports) {

    var $ = layui.jquery,
        table = layui.table;

    // 封装方法
    var mod = {
        /**
         * 渲染入口
         * @param myTable
         */
        render: function (myTable) {
            var tableBox = $('#'+myTable.id).next().children('.layui-table-box'),
                $main = tableBox.children('.layui-table-body').children('table').children('tbody>tr'),
                $fixLeft = tableBox.children('.layui-table-fixed-l').children('.layui-table-body').children('table'),
                $fixRight = tableBox.children('.layui-table-fixed-r').children('.layui-table-body').children('table'),
                cols = myTable.cols[0], mergeRecord = {};

            for (let i = 0; i < cols.length; i++) {
                var item3 = cols[i], field=item3.field;
                if (item3.merge) {
                    var mergeField = [field];
                    if (item3.merge != true) {
                        if (typeof item3.merge == 'string') {
                            mergeField = [item3.merge]
                        } else {
                            mergeField = item3.merge
                        }
                    }
                    mergeRecord[i] = {mergeField: mergeRecord,index:0, rowspan:1}
                }
            }

            $main.each(function (i) {
                if (i==0) {
                    for (var item in mergeRecord) {
                        $(this).children('[data-key$="'+item+'"]').attr('rowspan', '1');
                    }
                } else {
                    for (var item in mergeRecord) {
                        if (isMerge(i, item)) {
                            $(this).children('[data-field="'+field+'"').remove();
                            mergeRecord[field].rowspan += 1;
                            $main[mergeRecord[field][index]].children('[data-field="'+field+'"]').attr('rowspan', mergeRecord[field][rowspan])
                        } else {
                            mergeRecord[field].rowspan = 1;
                            mergeRecord[field].index = i;
                            $(this).children('[data-field="'+field+'"').attr('rowspan', 1)
                        }
                    }
                }
            })

            isMerge = function (index, item) {
                var mergeField = mergeRecord[item].mergeField;
                for (var i=0; i<mergeField.length; i++) {
                    if ($main[index-1].children('[data-field="'+mergeField[i]+'"]').text()
                        !== $main[index].children('[data-field="'+mergeField[i]+'"]').text()) {
                        return false;
                    }
                    if (table.cache[myTable.id]) {

                    }
                }
                return true;
            }

        }
    };

    // 输出
    exports('tableMerge', mod);
});

