import React from 'react';
import style from './Hashtags.module.scss';
import {HashtagButton} from './HashtagButton';
import {NotesContext} from '../App';

export const Hashtags: React.FC<HashtagsPropsType> = ({hashtags}) => {
    return (
        <div className={style.hashtags}>
            <NotesContext.Consumer>
                {value =>
                    hashtags.map((h, i) =>
                        <HashtagButton
                            key={i}
                            hashtag={h}
                            changeSearchTextValueCallBack={value.changeSearchTextValueCallBack}
                        />)
                }
            </NotesContext.Consumer>
        </div>
    )
}

interface HashtagsPropsType {
    hashtags: string[]
}