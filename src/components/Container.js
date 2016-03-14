import React, { Component, PropTypes } from 'react'
import { articlesStore, commentStore } from './../stores'
import ArticleList from './ArticleList'
import { loadAllArticles } from './../actions/articles'

import Select from 'react-select';
import selectStyles from 'react-select/dist/react-select.css'

class Container extends Component {
    state = {
        articles: articlesStore.getOrLoadAll(),
        selected: [],
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

        const selectedArticles = this.getSelectedArticles(articles);
        return (
            <div>
                {this.getSelector(articles)}
                {selectedArticles.length === 0 ?
                    <span>Select Articles</span> :
                    <ArticleList articles = {selectedArticles} />}
            </div>
        )
    }

    getSelectedArticles (articles) {
        return articles.filter((article) => {
            return this.state.selected.find((selected) => {
                return selected.value === article.id;
            });
        });
    }

    getSelector (articles) {
        let options = articles.map((article) => {
            return {
                value: article.id,
                label: article.title
            }
        });

        function onSelection(val, selected) {
            this.setState({
                selected: selected
            });
        };

        return <Select
            name="form-field-name"
            value={this.state.selected}
            options={options}
            multi={true}
            onChange={onSelection.bind(this)}
        />
    }

    change = () => {
        this.setState({
            loading: articlesStore.loading,
            articles: articlesStore.getAll()
        })
    };
}

export default Container