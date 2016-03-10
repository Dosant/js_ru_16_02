import React, { Component, PropTypes } from 'react'
import { articlesStore, commentStore } from './../stores'
import ArticleList from './ArticleList'
import { loadAllArticles } from './../actions/articles'

class Container extends Component {
    state = {
        articles: articlesStore.getOrLoadAll(),
        loading: true
    }

    componentDidMount() {
        articlesStore.addChangeListener(this.change)
        commentStore.addChangeListener(this.change)
    }

    componentWillUnmount() {
        articlesStore.removeChangeListener(this.change)
        commentStore.removeChangeListener(this.change)
    }

    render() {
        const { articles, loading } = this.state
        if (loading) return <h3>Loading...</h3>
        return (
            <div>
                <ArticleList articles = {articles} />
            </div>
        )
    }

    change = () => {
        this.setState({
            loading: articlesStore.loading,
            articles: articlesStore.getAll()
        })
    };
}

export default Container