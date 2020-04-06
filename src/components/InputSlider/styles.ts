import styled, {css} from 'styled-components';

export const PartRight = styled.div`
    display: flex;
    color: rgb(170, 171, 173);
    &:before {
        content: '';
    }
`;

export const Wrapper = styled.input`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    line-height: 25px;
    font-size: 16px;
    width: 100%;
    padding: 5px 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-sizing: border-box;
`;

export const Box = styled.div<{ disabled?: boolean }>`
    position: relative;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`;

export const Container = styled.div<{ noInput?: boolean }>`
    position: relative;
    width: 100%;
`;

export const Tags = styled.div`
    position: relative;
    width: 100%;
`;

export const Tag = styled.div<{ val?: number; design?: 'outline' | 'material' }>`
    position: absolute;
    user-select: none;
    font-size: 12px;
    line-height: 18px;
    cursor: pointer;
    ${({val}) => `left: ${val}px;`}
    margin: 0px;
    
    &:last-child {
        right: 0px;
        left: auto;
    }

    &:first-child {
        right: 0px;
    }
`;

export const Line = styled.div<{
    disabled?: boolean;
    design?: 'outline' | 'material';
    val?: number;
    drag?: boolean;
    noInput?: boolean;
    size?: 'xl' | 'l' | 's' | 'xs';
}>`
    position: absolute;
    user-select: none;
    width: 100%;

    &::after{
        content: "";
        position: absolute;
        height: 4px;
        bottom: 0px;
        border-bottom-style: solid;
        border-bottom-width: 4px;
        border-bottom-color: #3f82a4;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        left: 0px;
        ${({val}) => `width: ${val}px;`}
        transition: all 0.1s ease 0s;
    }

    &::before{
        content: "";
        position: absolute;
        height: 4px;
        bottom: 0px;
        border-bottom-style: solid;
        border-bottom-width: 4px;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        ${({val}) => `width: calc(100% - ${val}px);`}
        left: unset;
        right: 0px;
        transition: all 0.1s ease 0s;
        border-color: transparent;
    }
`;

export const Circle = styled.div<{
    drag?: boolean;
    val: number;
    size?: 'xl' | 'l' | 's' | 'xs';
}>`
    ${({drag}) => !drag && 'transition: all .1s'}
    ${({val}) =>
        css`
            &:hover,
            &:focus {
                top: -12px;
                background-color: black;
                width: 20px;
                outline: none;
                height: 20px;
                left: ${val - 9}px;
            }
        `}
    position: absolute;
    user-select: none;
    z-index: 1;
    width: 16px;
    height: 16px;
    top: -10px;
    background-color: #3f82a4;
    cursor: pointer;
    ${({val}) => `left: ${val - 9}px;`}
    border-radius: 40px;
    transition: all 0.1s ease 0s;
`;
