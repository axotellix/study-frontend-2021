
// [ STATE ]
export const state = () => {
    articles: []
};

// [ MUTATIONS ]
export const mutations = {

    //@ keep > local version of articles (for search filtering) 
    keep_local( state, articles ) {
        state.articles = articles
    }
    
}