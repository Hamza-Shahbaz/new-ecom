import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { RESET_BREADCRUMBS } from '../../redux/constant/constants'
import TextShortener from '../DynamicText/TextShortner'

const Breadcrumbs = () => {

    const params = useParams()
    const dispatch = useDispatch();

    const breadcrumbs = useSelector(
        (state) => state.BreadcrumbReducerData.breadcrumbs
    );

    useEffect(() => {
        dispatch({ type: RESET_BREADCRUMBS });
    }, [params?.id])

    if (breadcrumbs.length < 2) {
        return <></>
    }

    return (
        <section className='breadcrumbs'>
            <div className='container'>
                <div className='row align-items-center justify-content-center'>
                    <div className='col-xl-12 col-lg-12 col-md-12'>
                        <div className='inner'>
                            <i className='fa fa-home' style={{marginRight: '7px'}}/>
                            {breadcrumbs?.length > 0 && breadcrumbs.map((item, index) => {
                                return <Link key={index} to={item.path}><TextShortener text={item.name} textLimit={25} component={""} /></Link>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Breadcrumbs
