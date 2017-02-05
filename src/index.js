import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';


const API_KEY = 'AIzaSyBwNyg2Uwa6ZS2LLWDpv4k2mTOQvnFjI9Q';

class App extends Component
{
    constructor (props) {
        super(props);

        this.state = {
            videos : [],
            selectedVideo : null

        };
    }

    videoSearch(term) {
        YTSearch({key : API_KEY, term : term}, (data) => {
            this.setState({
                videos : data,
                selectedVideo : data[0]
            });
        });
    }

    render()
    {
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 500);

        return (
            <div>
                <SearchBar onSearchTermChange = {videoSearch} />
                <VideoDetail video = {this.state.selectedVideo} />
                <VideoList videos = {this.state.videos} onVideoSelect = {selectedVideo => this.setState({selectedVideo})} />
            </div>
        );
    }
}


ReactDOM.render(
    <App />

    , document.querySelector('.container'));
