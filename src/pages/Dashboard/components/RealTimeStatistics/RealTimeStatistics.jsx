import React, { Component } from 'react';
import { Grid } from '@icedesign/base';

const { Row, Col } = Grid;

export default class RealTimeStatistics extends Component {
  static displayName = 'RealTimeStatistics';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row wrap gutter="20">
        <Col xxs="24" s="12" l="6">
          <div style={{ ...styles.itemBody, ...styles.green }}>
            <div style={styles.itemTitle}>
              <p style={styles.titleText}>QPS</p>
              <span style={styles.tag}>实时</span>
            </div>
            <div style={styles.itemContent}>
              <h2 style={styles.itemNum}>7751</h2>
              <div style={styles.itemMeta}>
                <p style={styles.total}>最大：627/节点</p>
                <p style={styles.desc}>结点数：15，统计粒度：分钟</p>
              </div>
            </div>
          </div>
        </Col>
        <Col xxs="24" s="12" l="6">
          <div style={{ ...styles.itemBody, ...styles.lightBlue }}>
            <div style={styles.itemTitle}>
              <p style={styles.titleText}>外网出流量</p>
              <span style={styles.tag}>实时</span>
            </div>
            <div style={styles.itemContent}>
              <h2 style={styles.itemNum}>178Mbps</h2>
              <div style={styles.itemMeta}>
                <p style={styles.total}>最大：13Mbps/节点</p>
                <p style={styles.desc}>结点数：15，统计粒度：分钟</p>
              </div>
            </div>
          </div>
        </Col>
        <Col xxs="24" s="12" l="6">
          <div style={{ ...styles.itemBody, ...styles.darkBlue }}>
            <div style={styles.itemTitle}>
              <p style={styles.titleText}>响应时间</p>
              <span style={styles.tag}>实时</span>
            </div>
            <div style={styles.itemContent}>
              <h2 style={styles.itemNum}>970ms</h2>
              <div style={styles.itemMeta}>
                <p style={styles.total}>95%响应时间：690ms，</p>
                <p style={styles.desc}>结点数：15，统计粒度：分钟</p>
              </div>
            </div>
          </div>
        </Col>
        <Col xxs="24" s="12" l="6">
          <div style={{ ...styles.itemBody, ...styles.darkBlue }}>
            <div style={styles.itemTitle}>
              <p style={styles.titleText}>错误数</p>
              <span style={styles.tag}>实时</span>
            </div>
            <div style={styles.itemContent}>
              <h2 style={styles.itemNum}>1389</h2>
              <div style={styles.itemMeta}>
                <p style={styles.total}>前端错误：175，后端错误数：1214</p>
                <p style={styles.desc}>结点数：15，统计粒度：分钟</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

const styles = {
  item: {
    width: '25%',
    padding: '0 10px',
  },
  itemBody: {
    marginBottom: '20px',
    padding: '10px 20px',
    borderRadius: '4px',
    color: '#fff',
    height: '144px',
  },
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    position: 'relative',
  },
  titleText: {
    margin: 0,
    fontSize: '14px',
  },
  tag: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: '2px 4px',
    borderRadius: '4px',
    fontSize: '12px',
    background: 'rgba(255, 255, 255, 0.3)',
  },
  itemNum: {
    margin: '16px 0',
    fontSize: '32px',
  },
  total: {
    margin: 0,
    fontSize: '12px',
  },
  desc: {
    margin: 0,
    fontSize: '12px',
  },
  green: {
    background: '#31B48D',
  },
  lightBlue: {
    background: '#38A1F2',
  },
  darkBlue: {
    background: '#7538C7',
  },
  navyBlue: {
    background: '#3B67A4',
  },
};
