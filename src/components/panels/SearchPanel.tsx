import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import style from './Search.module.scss';

export const SearchPanel: React.FC<SearchPanelPropsType> = ({searchTextValue, changeSearchTextValueCallBack}) => {
    const [value, setValue] = useState(searchTextValue);
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }
    const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') changeSearchTextValueCallBack(value);
        if (e.key === 'Escape') setValue('');
    }
    const clickHandler = () => changeSearchTextValueCallBack(value);
    useEffect(() => {
        setValue(searchTextValue);
    }, [searchTextValue])
    return (
        <div className={style.panel}>
            <input
                type="text"
                value={value}
                placeholder="#search"
                onChange={changeHandler}
                onKeyDown={keyPressHandler}
            />
            <button onClick={clickHandler}>search</button>
        </div>
    )
}

interface SearchPanelPropsType {
    searchTextValue: string
    changeSearchTextValueCallBack: (value: string) => void
}