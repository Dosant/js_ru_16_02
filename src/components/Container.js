import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { articlesStore, usersStore } from '../stores'
import ArticleList from './ArticleList'
import { loadAllArticles, createNewArticle } from './../actions/articles'
import { login } from '../actions/user'
import dictionary from '../utils/dictionary'

class Container extends Component {
    constructor(...args) {
        super(...args)
        this.state = {
            articles: articlesStore.getOrLoadAll(),
            loading: articlesStore.loading,
            currentUser: usersStore.currentUser,
            lang: 'en'
        }
        this.state.dict = dictionary[this.state.lang]
    }

    componentDidMount() {
        articlesStore.addChangeListener(this.change)
        usersStore.addChangeListener(this.changeUser)
    }

    componentWillUnmount() {
        articlesStore.removeChangeListener(this.change)
        usersStore.removeChangeListener(this.changeUser)
    }

    static childContextTypes = {
        user: PropTypes.string,
        dict: PropTypes.object
    }

    getChildContext() {
        return {
            user: this.state.currentUser,
            dict: this.state.dict
        }
    }

    render() {
        const { loading } = this.state
        if (loading) return <h3>{this.state.dict.loading}</h3>
        return (
            <div>
                {this.getLangButton()}
                {this.getLogin()}
                {this.getMenu()}
                {this.props.children}
            </div>
        )
    }

    login = (ev) => {
        ev.preventDefault()
        login()
    }

    getLangButton = () => {
        return <button onClick={this.changeLang}>{this.state.lang}</button>
    }

    getLogin = () => {
        if (this.state.currentUser) {
            return <div>{`Hello ${this.state.currentUser}`}</div>
        } else {
           return <a href = "#" onClick = {this.login}>{this.state.dict.login}</a>
        }
    }

    getMenu() {
        const links = this.state.articles.map((article) =>
            <li key={article.id}>
                <Link to={`/articles/${article.id}`}
                    activeClassName = "active"
                    activeStyle = {{color: 'red'}}
                >
                    {article.title}
                </Link>
            </li>)
        return <div>
            <ul>{links}</ul>
            <a href="#" onClick={this.handleNewClick}>{this.state.dict.createNewArticle}</a>
        </div>
    }
    handleNewClick = (ev) => {
        ev.preventDefault()
        createNewArticle()
    }

    changeUser = () => {
        this.setState({
            currentUser: usersStore.currentUser
        })
    }

    changeLang = () => {
        const newLang = this.state.lang === 'en' ? 'ru' : 'en'
        this.setState({
            lang: newLang,
            dict: dictionary[newLang]
        })
    }

    change = () => {
        this.setState({
            loading: articlesStore.loading,
            articles: articlesStore.getAll()
        })
    };
}


export default Container