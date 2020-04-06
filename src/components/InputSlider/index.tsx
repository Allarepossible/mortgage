import React, {useState, useCallback, useEffect, useRef} from 'react';
import {Box, Container, Line, Circle, Tag, Tags, PartRight, Wrapper} from './styles';

// параметры сдвига, которые нельзя передать через css или пресеты
const shift = 7;
const shiftRight = 9;

// обратное constructValue преобразование
const reconstructValue = (min, max, max2, val) => {
    const value = ((val - min) * max2) / (max - min);
    // возврат с учетом граничных состояний
    if (!value || isNaN(value) || value < min) {
        return min;
    }
    if (value > max2) {
        return max2;
    }

    return value;
};

// Расчет положения тегов (меток)
const constructValueTag = (min, max, max2, val) => ((val - min) * (max2 - shift - shiftRight)) / (max - min);

// Фабрика тегов (меток)
const constructTags = (tags, min, max, max2, onClick) =>
    React.Children.toArray(tags).map(tag =>
        React.cloneElement(tag, {
            val: constructValueTag(min, max, max2, tag.props.val),
            onClick: e => onClick(e, tag.props.val),
        })
    );

export const InputSlider = React.forwardRef(
    (props: any, ref) => {
        const {
            name,
            design,
            min = 0,
            max = 30,
            step = 1,
            children,
            onChange,
            postfix,
            size,
            value,
        } = props;

        const [drag, setDrag] = useState(false);
        // const [val, setVal] = useState(0);
        const isDrag = useRef({val: false});
        const numberInput = useRef<HTMLDivElement>(null);
        const container = useRef<HTMLDivElement>(null);

        const mouseMoveHandler = useCallback(
            (event: any, flag = isDrag.current.val) => {
                if (container.current) {
                    const rect = container.current.getBoundingClientRect();
                    const value =
                        Math.ceil(reconstructValue(min, rect.width, max / step, event.screenX - rect.x)) * step;
                    if (flag && value <= max && value >= min) {
                        if (typeof onChange === 'function') {
                            onChange(event, {name, value});
                        }
                    }
                }
            },
            [isDrag, onChange, name, max, min, step]
        );

        const mouseUpHandler = useCallback(() => {
            setDrag(false);
            isDrag.current.val = false;
            document.body.removeEventListener('mousemove', mouseMoveHandler);
            document.body.removeEventListener('mouseup', mouseUpHandler);
        }, [mouseMoveHandler]);

        const handleMouseDown = useCallback(
            e => {
                e.preventDefault();
                setDrag(true);
                isDrag.current.val = true;
                if (numberInput.current) {
                    numberInput.current.focus();
                }
                document.body.addEventListener('mousemove', mouseMoveHandler);
                document.body.addEventListener('mouseup', mouseUpHandler);
            },
            [mouseMoveHandler, mouseUpHandler]
        );

        useEffect(
            () => () => {
                document.body.removeEventListener('mousemove', mouseMoveHandler);
                document.body.removeEventListener('mousup', mouseUpHandler);
            },
            []
        );

        const handleClickTag = useCallback(
            (event, value) => {
                if ( typeof onChange === 'function') {
                    onChange(event, {name, value});
                }
            },
            [name, onChange]
        );

        const width = (container.current && container.current.offsetWidth) || 0;
        const inputRef = useCallback(
            elem => {
                if (elem) {
                    (numberInput.current as any) = elem;
                    if (typeof ref === 'function') {
                        (ref as (instance: HTMLInputElement | null) => void)(elem);
                    }
                    if (ref && typeof ref === 'object') {
                        (ref as any).current = elem;
                    }
                }
            },
            [ref]
        );
        const handleLineClick = useCallback((event: any) => mouseMoveHandler(event, true), [mouseMoveHandler]);

        const handleFocus = useCallback(() => setDrag(true), []);
        const handleBlur = useCallback(() => setDrag(false), []);

        return (
            <Box>
                <Container>
                    <Container ref={container}>
                        <Wrapper
                            ref={inputRef}
                            value={String(value)}
                            onChange={onChange}
                        />
                        <Line
                            design={design}
                            // val={val}
                            drag={drag}
                            size={size}
                            onClick={handleLineClick}
                        >
                            <Circle
                                tabIndex={0}
                                drag={drag}
                                val={1}
                                size={size}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onMouseDown={handleMouseDown}
                            />
                        </Line>
                    </Container>
                    {children && <Tags>{constructTags(children, min, max, width, handleClickTag)}</Tags>}
                </Container>
                {postfix && <PartRight>{postfix}</PartRight>}
            </Box>
        );
    }
) as any;
InputSlider.Tag = Tag;

export default InputSlider;
