import React, { Component } from 'react'
import { ButtonToolbar, Button, ButtonGroup } from 'reactstrap';

interface IPaginationState {
    pArray: any[],
    page: number,
    view: number
}

interface IPaginationProps {
    pageFromParent: number,
    viewFromParent: number,
    lengthFromParent: number,
    selectPage: (newPage: number) => any
}

export default class PaginationComponent extends Component<IPaginationProps, IPaginationState> {
    constructor(props: any) {
        super(props);

        this.state = {
            pArray: [],
            page: this.props.pageFromParent,
            view: this.props.viewFromParent
        }
    }

    pagination = (currentPage: number, finalPage: number) => {
        let left = currentPage - 1,
            right = currentPage + 2,
            range = [],
            rangeWithDots = [],
            l;

        for (let i = 1; i <= finalPage; i++) {
            if (i === 1 || i === finalPage || i >= left && i < right) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    }

    newPage = (nextPage: number) => {
        if (nextPage < 1 || nextPage > this.props.lengthFromParent) {
            return;
        } else {
            this.props.selectPage(nextPage);
        }
    }

    pageButtonSelect = (event: any) => {
        const target = event.currentTarget.innerText;
        this.newPage(+target);
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevProps !== this.props) {
            const finalPage = Math.ceil(this.props.lengthFromParent / this.props.viewFromParent);
            this.setState({

            });
            this.setState({
                pArray: this.pagination(this.props.pageFromParent, finalPage),
                page: this.props.pageFromParent,
                view: this.props.viewFromParent
            })
        }
    }

    render() {
        let buttons: any = [];
        let currentButton: any;

        for (let i = 0; i < this.state.pArray.length; i++) {
            currentButton = this.state.pArray[i];
            if (currentButton === '...') {
                buttons.push(<Button disabled>{currentButton}</Button>);
            } else if (currentButton === this.props.pageFromParent) {
                buttons.push(<Button active>{currentButton}</Button>)
            } else {
                buttons.push(<Button onClick={this.pageButtonSelect}>{currentButton}</Button>)
            }
        }

        return (
            <ButtonToolbar className="justify-content-center">
                <Button disabled={(this.props.pageFromParent === 1) ? true : false} onClick={() => this.newPage(this.props.pageFromParent - 1)}>Prev</Button>
                <ButtonGroup className="mx-2">
                    {buttons}
                </ButtonGroup>
                <Button disabled={(this.props.pageFromParent === Math.ceil(this.props.lengthFromParent / this.props.viewFromParent)) ? true : false} onClick={() => this.newPage(this.props.pageFromParent + 1)}>Next</Button>
            </ButtonToolbar>
        )
    }
}
