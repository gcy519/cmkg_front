import Mock from 'mockjs'

export default {
    mockData() {
        const BASE_PATH = process.env.BASE_URL.endsWith('/') ?
            process.env.BASE_URL.substr(0, process.env.BASE_URL.length - 1) :
            process.env.BASE_URL

        Mock.mock('/EntityRelationService/entityDetails?name=%E5%A7%9C%E5%AD%90%E7%89%99&category=Person', 'get', function(option) {
            alert("1")
            var _data = JSON.parse('{\
                "code": 200, \
                "data": "姜子牙（约前？—约前1015年），姜姓，吕氏，名尚，字子牙，号飞熊，商末周初，政治家、军事家、韬略家，周朝开国元勋，兵学奠基人。"\
              }\
            ')
            return Mock.mock(
                _data
                // {
                // status:200,
                // data:ListhotSearch
                // //list
                // }
            )
        })
        Mock.mock('/EntityRelationService/relationDetails?head=%E5%A7%9C%E5%AD%90%E7%89%99&tail=%E5%93%AA%E5%90%92&type=ht', 'get',

            function(option) {
                var _data = JSON.parse('{\
                "code": 200, \
                "data": {"relation":"师叔关系"}\
              }\
            ')
                return Mock.mock(
                    _data
                    // {
                    // status:200,
                    // data:ListhotSearch
                    // //list
                    // }
                )
            })

        Mock.mock('/Platform/SearchList?type=relation', 'get', function(option) {

            // const { type } = JSON.parse(option.body)
            var _data = JSON.parse('{\
        "code": 200, \
        "data": {\
          "type":"entity",\
          "search_list": ["姜子牙与哪吒", "姜子牙与女娲"]\
        }\
      }\
    ')
                // var ListhotSearch = []
                //     // if (type == 'entity') {
                // ListhotSearch = ['哪吒', '姜子牙']
                //     // }
                //     // //
                //     // if (type == 'relation') {
                //     //     ListhotSearch = ['哪吒与姜子牙', '姜子牙与女娲']
                //     // }
                //     // //
                //     // if (type == 'qa') {
                //     //     ListhotSearch = ['哪吒属于什么教派', '姜子牙属于什么教派', '可以吃饭了吗']
                //     // }
            return Mock.mock(
                _data
                // {
                // status:200,
                // data:ListhotSearch
                // //list
                // }
            )
        })

        Mock.mock('/EntityRelationService/getAllEntities', 'get', function(option) {
            var _data = JSON.parse('{\
          "code": 200, \
          "data": {\
            "knowledge": "《西游记》是中国古代第一部浪漫主义章回体长篇神魔小说。"\
          }\
        }\
      ')
            return Mock.mock(_data)
        })

        Mock.mock('/Platform/RandomKnowledge', 'get', function(option) {
            var _data = JSON.parse('{\
            "code": 200, \
            "data": {\
              "knowledge": "《西游记》是中国古代第一部浪漫主义章回体长篇神魔小说。"\
            }\
          }\
        ')
            return Mock.mock(_data)
        })


        Mock.mock('/api/comment', 'post', function(option) {
            //请求相关的参数
            //模拟假数据需要重新写Mock
            var msg = option.body;
            return Mock.mock({
                status: 200,
                message: '留言成功:' + msg
                    //'@cword(4,9)' + option.body + '@cword(4,9)'
            })
        })

        Mock.mock('/api/board_list', 'post', function(option) {
            //请求相关的参数
            var list_boards = ['少儿最喜欢榜', '最具社会影响力榜', '最具商业价值榜']

            return Mock.mock({
                status: 200,
                data: list_boards
            })
        })

        Mock.mock('/api/billboard', 'post', function(option) {
            //请求相关的参数
            //模拟假数据需要重新写Mock
            var _data;
            if (option.body == 0) {
                _data = ['榜单0榜首', '榜单0探花']
            }
            if (option.body == 1) {
                _data = ['榜单1榜首', '榜单1探花', '榜单1榜首', '榜单1探花', '榜单1榜首', '榜单1探花', '榜单1榜首', '榜单1探花', '榜单1榜首', '榜单1探花', '榜单1榜首', '榜单1探花']
            }
            if (option.body == 2) {
                _data = ['榜单2榜首', '榜单2探花']
            }
            return Mock.mock({
                status: 200,
                data: _data
            })

        })



        Mock.mock('/Platform/DataCollection', 'get', function(option) {
            //请求相关的参数
            var _data = JSON.parse('{"code": 200, "data": { "entities_number": 100, "relations_number": 200,  "references_number": 2}')
                //模拟假数据需要重新写Mock

            return Mock.mock(_data)
        })

        Mock.mock('/api/relation', 'post', function(option) {
            //请求相关的参数

            //模拟假数据需要重新写Mock

            return Mock.mock({
                status: 200,
                data: option.body + '的关系介绍'
                    //'@cword(4,9)' + option.body + '@cword(4,9)'
            })
        })

        Mock.mock('/EntityRelationService/getAll', 'get', function(option) {
            //请求相关的参数 
            var _data = JSON.parse(
                    '{ "code": 200,  "data": [ {"uid": "8074232e3eaf40de9c5b6f312f3244ba", "name": "姜子牙"},  {"uid": "22cc895d75624e6eb5367f854bdafa7d", "name": "元始天尊"}]}'
                )
                //模拟假数据需要重新写Mock

            return Mock.mock(
                _data
            )
        })


        Mock.mock('/EntityRelationService/entityDetails', 'get', function(option) {
            //请求相关的参数
            const { name } = JSON.parse(option.body)

            var _data = JSON.parse(
                '{"data":{"uid":"8074232e3eaf40de9c5b6f312f3244ba","name":"介绍' + name + '}}'
            )

            //模拟假数据需要重新写Mock
            return Mock.mock({
                code: 200,
                data: _data
                    //'@cword(4,9)' + option.body + '@cword(4,9)'
            })
        })

        Mock.mock('/QA?question=%E5%A7%9C%E5%AD%90%E7%89%99%E5%B1%9E%E4%BA%8E%E4%BB%80%E4%B9%88%E6%95%99%E6%B4%BE', 'get', function(option) {
            //请求相关的参数
            // const { question } = JSON.parse(option.body)
            //模拟假数据需要重新写Mock
            // var msg = '百事通我也不知道呢';
            // if (question == '哪吒属于什么教派') {
            //     msg = '道教'
            // } else if (question == '姜子牙属于什么教派') {
            //     msg = '阐教'
            // }

            var _data = JSON.parse('{\
        "code": 200, \
        "data": {\
          "question": "姜子牙是什么教派", \
          "answer": "姜子牙属于阐教。"}   \
        }')
            alert(_data.data.answer)
            return Mock.mock(
                _data
            )
        })

        Mock.mock('/Visualization/tree?source=%E8%A5%BF%E6%B8%B8%E8%AE%B0', 'get', (option) => {
            const { source } = JSON.parse(option.body)

            var _data = JSON.parse('\
      {\
        "code": 200, \
        "data": {\
              "name": "' + source + '", \
              "children": [\
                {"name": "唐僧师徒", \
                "children": [\
                  {"name": "孙悟空", "has_father": true},\
                      {"name": "唐三藏", "has_father": true}, \
                      {"name": "猪八戒", "has_father": true}, \
                      {"name": "沙悟淨", "has_father": true}, \
                      {"name": "白龙马", "has_father": true}\
                      ]\
            }\
          ]\
        }\
      }')
            console.log(_data)
            return Mock.mock(
                _data
            )
        })


        Mock.mock('/Visualization/graph?source=%E8%A5%BF%E6%B8%B8%E8%AE%B0', 'get', (option) => {
            var _data = JSON.parse('{\
        "code": 200, \
        "data":\
        {\
            "nodes":[{"id":0,"name":"姜子牙","type":"人","other_attr":"其他属性示例"},{"id":1,"name":"哪吒","type":"神","other_attr":"其他属性示例"},],\
            "edges":[{"head":0,"tail":2,"type":"关系类别"},{"head":0,"tail":1,"type":"关系类别"}]\
        }\
      }')
            console.log(_data)
            return Mock.mock(
                _data
            )
        })


        Mock.mock(RegExp('/userList.*'), 'get', (params) => {

            //代码块
            return {
                'code': 1,
                'token': 'fdsjfhjkdshfkldsajfjasdfbjsdkfhsdajfj'
            }

        })
    }
}