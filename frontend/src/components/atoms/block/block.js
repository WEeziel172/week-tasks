import React from 'react'
import { useSpring, animated } from 'react-spring'
import styled, { css } from 'styled-components'

const Block = styled(animated.div)`
    margin: 0;
    padding: 0;
    height: 5rem;
    width: 5rem;
    background: red;


    &hover {

    }

`

export {
    Block
}