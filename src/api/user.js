import { _get } from '../utils/request'
import { request, get } from '../utils/request'

export const getEntity = _name => {
    var params = {
            name: _name,
            category: "Person"
        }
        // return get(HOST + 'EntityRelationService/personDetails?name='+_name, params)
    return get('/EntityRelationService/entityDetails', params)
}

export const getAllEntity = params => {
        return get('/EntityRelationService/getAllEntities', params)
    }
    //list
export const requestRelation = params => {
    return request('/EntityRelationService/relationDetails', params)
}

//list
export const getRelation = params => {
    return get('/EntityRelationService/relationDetails', params)
}

//list
export const requestHotSearch = _type => {
    var params = {
        type: _type
    }
    return get('/Platform/SearchList', params)
}

//text
export const requestQA = _question => {
    var params = {
        question: _question
    }
    return get('/QA', params)
}

//可以定时调用
export const requestStory = params => {
    return get('/Platform/RandomKnowledge', params)
}


export const getDataCollection = params => {
    return get('/Platform/DataCollection', params)
}

export const requestBoardList = params => {
    return request('/api/board_list', params)
}

export const requestBillboard = params => {
    return request('/api/billboard', params)
}

export const requestPostComment = params => {
    return request('/api/post_comment', params)
}

export const requestGetComment = params => {
    return request('/api/get_comment', params)
}

export const getTailEntity = sourceId => {
    var params = {
        type: "h",
        head: sourceId
    }
    return get('/EntityRelationService/relationDetails', params)
}

// export const requestGEX = params => {
//   return request('api/type=file&filename=tw_lk_fb.gexf', params)

// }

export const getTree = _source => {
    var params = {
        source: _source
    }
    return get('/Visualization/tree', params)
}

export const getGraph = _source => {
    var params = {
        source: _source
    }
    return get('/Visualization/graph', params)
}