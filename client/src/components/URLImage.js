import React from 'react';
import { Image } from 'react-konva';

class URLImage extends React.Component {
    state = {
        image: null
    };
    componentDidMount() {
        this.loadImage();
    }
    componentDidUpdate(oldProps) {
        if (oldProps.src !== this.props.src) {
            this.loadImage();
        }
    }
    componentWillUnmount() {
        this.image.removeEventListener('load', this.handleLoad);
    }
    loadImage() {
        this.image = new window.Image();
        this.image.crossOrigin = 'Anonymous';
        this.image.addEventListener('load', this.handleLoad, false);
        this.image.src = this.props.src;
    }
    handleLoad = () => {

        this.setState({
            image: this.image
        });

        //  update layer manually:
        // this.imageNode.getLayer().batchDraw();
    };
    render() {
        return (
            <Image
                x={this.props.x}
                y={this.props.y}
                id={this.props.id}
                name={this.props.name}
                text={this.props.text}
                width={this.props.width}
                height={this.props.height}
                image={this.state.image}
                draggable={this.props.draggable}
                onDragEnd={this.props.onDragEnd}
                onClick={this.props.onClick}
                strokeWidth={this.props.strokeWidth}
                stroke={this.props.stroke}
                strokeEnabled={this.props.strokeEnabled}
                ref={node => {
                    this.imageNode = node;
                }}
            />
        );
    }
}
export default URLImage;