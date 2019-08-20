import React, { Component } from 'react';
import { Card, Collapse, Progress, CardTitle, CardSubtitle, CardText, CardImg } from 'reactstrap';

interface ICollectionDisplayProps {
    collection: any
}

interface ICollectionDisplayState {
    collapse: boolean
}

export default class CollectionDisplay extends Component<ICollectionDisplayProps, ICollectionDisplayState> {
    constructor(props: any) {
        super(props);

        this.state = {
            collapse: false
        }
    }

    toggleDropDown = () => {
        this.setState({
            collapse: !this.state.collapse
        });
    }

    render() {
        const collection = this.props.collection;
        return (

            <Card key={`collection-` + collection.id} style={{ backgroundColor: '#333', borderColor: '#333' }}  >
                <CardImg src={collection.featuredCardImage} onClick={this.toggleDropDown} style={{ marginBottom: '1rem' }} top width="100%" alt="Card image cap" />
                <Collapse background-color="dark" isOpen={this.state.collapse}>
                    <CardSubtitle>Artist: {collection.author}</CardSubtitle>
                    <Progress multi>
                        <Progress bar className="text-dark bg-white" color="light" value="25">White</Progress>
                        <Progress bar className="text-white bg-info" value="15">Blue</Progress>
                        <Progress bar className="text-white bg-dark" value="20">Black</Progress>
                        <Progress bar className="text-white bg-danger" value="10">Red</Progress>
                        <Progress bar className="text-white bg-success" value="10">Green</Progress>
                    </Progress>
                    <Card body inverse color="dark" >
                        <CardTitle>{collection.name}</CardTitle>
                        <CardSubtitle>{collection.author}</CardSubtitle>
                        <CardSubtitle>{collection.format}</CardSubtitle>
                        {collection.description && <CardText>{collection.description}</CardText>}
                    </Card>
                </Collapse>
            </Card>

        )
    }
}