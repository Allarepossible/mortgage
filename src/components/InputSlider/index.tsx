import React, {useState, useCallback, useEffect, useRef} from 'react';
import {Box, Container, Line, Circle, Tag, Tags, Wrapper} from './styles';

const constructValue = (min, max, max2, val) => {
    const value = ((val - min) * (max2 - 16)) / (max - min) + 7;
    if (!value || isNaN(value) || value < min) {
        return 7;
    }
    if (value > max2) {
        return max2 - 7;
    }

    return value;
};

const reconstructValue = (min, max, max2, val) => {
    const value = ((val - min) * max2) / (max - min);
    if (!value || isNaN(value) || value < min) {
        return min;
    }
    if (value > max2) {
        return max2;
    }

    return value;
};

// Расчет положения тегов (меток)
const constructValueTag = (min, max, max2, val) => ((val - min) * (max2 - 16)) / (max - min);

export const InputSlider = React.forwardRef(
    (props: any, ref) => {
        const {
            min = 0,
            max = 30,
            step = 1,
            onChange,
            value,
            tags,
        } = props;

        const [drag, setDrag] = useState(false);
        const [val, setVal] = useState(0);
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
                            onChange(event, {value});
                        }
                    }
                }
            },
            [isDrag, onChange, max, min, step]
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
        const resizeHandler = useCallback(() => {
            const width = (container.current && container.current.offsetWidth) || 0;
            setVal(constructValue(min, max, width, value));
        }, [value, min, max]);

        useEffect(
            () => () => {
                document.body.removeEventListener('mousemove', mouseMoveHandler);
                document.body.removeEventListener('mousup', mouseUpHandler);
            },
            []
        );

        useEffect(() => {
            resizeHandler();
        }, [value, min, max, resizeHandler]);

        const handleClickTag = useCallback(
            (event, value) => {
                if ( typeof onChange === 'function') {
                    onChange(event, {value});
                }
            },
            [onChange]
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
                            val={val}
                            drag={drag}
                            onClick={handleLineClick}
                        >
                            <Circle
                                tabIndex={0}
                                drag={drag}
                                val={val}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onMouseDown={handleMouseDown}
                            />
                        </Line>
                    </Container>
                    {tags && tags.length > 0 && <Tags>
                        {tags.map(({val: tagValue, name}) => (
                            <Tag
                                key={name}
                                val={constructValueTag(min, max, width, tagValue)}
                                onClick={e => handleClickTag(e, tagValue)}
                            >{name}</Tag>
                        ))}
                    </Tags>}
                </Container>
            </Box>
        );
    }
) as any;

export default InputSlider;
