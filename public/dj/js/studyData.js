layui.use(['element', 'form', 'laydate', 'laypage', 'layer', 'jquery', 'upload', 'table', 'layedit'], function() {
  var element = layui.element;
  var laydate = layui.laydate;
  var laypage = layui.laypage;
  var layer = layui.layer;
  var upload = layui.upload;
  var table = layui.table;
  var layedit = layui.layedit;
  var addBook = null;
  var addVideo = null;
  var tableAdd = null;
  var addStuff = null;
  laydate.render({
    elem: '#test1' //指定元素
  });
  laypage.render({
    elem: 'page1',
    count: 50,
    theme: '#fff',
    layout: ['prev', 'page', 'next', 'count']
  });
  laypage.render({
    elem: 'page2',
    count: 50,
    theme: '#fff',
    layout: ['prev', 'page', 'next', 'count']
  });
  
  layedit.build('textarea', {
    height: 170
  }); //建立新增材料弹框的富文本框

  table.render({
    elem: '#table',
    url: './testdata/subject.json', //数据接口,
    page: {
      limit: 20,
      layout: ['count', 'prev', 'page', 'next']
    },
    cols: [
      [ //表头
        {
          field: 'subjName',
          title: '材料标题',
          width: 580,
          templet: '#subjName'
        },
        {
          field: 'subjState',
          title: '发布组织',
          width: 290,
          templet: '#subjState'
        },
        {
          field: 'publishtime',
          title: '发布时间',
          width: 290
        },
        {
          field: 'subjOpt',
          title: '操作',
          width: 290,
          toolbar: '#subjOpt'
        }
      ]
    ]
  });
  //新增书籍弹框的操作
  var chooseImg = upload.render({
    elem: '#chooseImg' //绑定元素
      ,
    url: '/upload/' //上传接口
      ,
    done: function(res) {
      //上传完毕回调
    },
    error: function() {
      //请求异常回调
    }
  });
  var chooseFujin = upload.render({
    elem: '#chooseFujin' //绑定元素
      ,
    url: '/upload/' //上传接口
      ,
    done: function(res) {
      //上传完毕回调
    },
    error: function() {
      //请求异常回调
    }
  });

  $('#addBook').on('click', function() {
    addBook = layer.open({
      type: 1,
      title: '新增书籍',
      area: ['664px', '720px'],
      content: $('#addBookTem'),
      end: function() {
        $('#addBookTem').css('diaplay', 'none')
      }
    })
  })
  $('.edit1').on('click', function() {
    addBook = layer.open({
      type: 1,
      title: '新增书籍',
      area: ['664px', '790px'],
      content: $('#addBookTem'),
      end: function() {
        $('#addBookTem').css('diaplay', 'none')
      }
    })
  })
  $('.cancel').on('click', function() {
    layer.close(addBook);
  })
  //新增视频弹框的操作
  var chooseVideo = upload.render({
    elem: '#chooseVideo' //绑定元素
      ,
    url: '/upload/' //上传接口
      ,
    done: function(res) {
      //上传完毕回调
    },
    error: function() {
      //请求异常回调
    }
  });
  $('#addVideo').on('click', function() {
    addVideo = layer.open({
      type: 1,
      title: '新增视频',
      area: ['664px', '475px'],
      content: $('#addVideoTem'),
      end: function() {
        $('#addVideoTem').css('diaplay', 'none')
      }
    })
  })
  $('.edit2').on('click', function() {
    addVideo = layer.open({
      type: 1,
      title: '新增视频',
      area: ['664px', '475px'],
      content: $('#addVideoTem'),
      end: function() {
        $('#addVideoTem').css('diaplay', 'none')
      }
    })
  })
  $('.cancel').on('click', function() {
    layer.close(addVideo);
  })
  //新增材料弹框的操作

  table.on('tool(table)', function(obj) {
    if (obj.event == 'edit') {
      addStuff = layer.open({
        type: 1,
        area: ['664px', '430px'],
        title: '新增材料',
        content: $('#addStuffTem'),
        end: function() {
          $('#addStuffTem').css('display', 'none')
        }
      })
    }
  })
  $('#addStuff').on('click', function() {
    addStuff = layer.open({
      type: 1,
      title: '新增材料',
      area: ['664px', '430px'],
      content: $('#addStuffTem'),
      end: function() {
        $('#addStuffTem').css('diaplay', 'none')
      }
    })
  })
  $('.cancel').on('click', function() {
    layer.close(addStuff);
  })
});
