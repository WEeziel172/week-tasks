import React from 'react'
import { useSpring, animated } from 'react-spring'
import styled, { css } from 'styled-components'

const Paragraph = styled(animated.p)`
    margin: 0;
    padding: 0;

    &hover {

    }
    color: ${props => props.color}

`

export {
    Paragraph
}