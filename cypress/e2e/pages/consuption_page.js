class ConsuptionPage {
    elements = {
        pageHeader: () => cy.get('.page-header').contains('Потребление платформы'), //report
        tableResource: (text) => cy.get('table').first().find('td').contains(text),
        tablePrice: (text, price) => cy.get('table').first().find('td').contains(text).parent().find('td').contains(price),
        thisMonthPriceFilter: () => cy.get('[qa-element="month"]'),
        thisDayPriceFilter: () => cy.get('[qa-element="day"]'),
        locationFilterBtn: () => cy.get('[qa-element="region-open"]').first(),
        locationList: (option) => cy.get('[qa-element="region-0"]').contains(option).first(),
        graphicInvoiceBtn: () => cy.get('[qa-element="tab-1"]'),
        detailedInvoiceBtn: () => cy.get('[qa-element="tab-2"]'),
        graphInvoicePriceLbl: (id) => cy.get('.price-graphs').find('strong').eq(id),
        detailedInvoiceLbl: (trID, tdID) => cy.get('[role="rowgroup"]').find('tr').eq(trID).find('td').eq(tdID),
        graphInvoiceTimeFilterBtn: () => cy.get('.price-graphs').find('button').eq(1),
        graphInvoiceFilterOption: (text) => cy.get('.list-unstyled').find('a').contains(text),
        graphInvoicePredictBtn: () => cy.get('#is-prediction'),
        graphInvoiceRegionFilterBtn: () => cy.get('.price-graphs').find('button').eq(0),
        detailedProjectFilterBtn: () => cy.get('.filters').find('button').eq(0),
        detailedRegionFilterBtn: () => cy.get('.filters').find('button').eq(1),
        detailedServiceFilterBtn: () => cy.get('.filters').find('button').eq(2),
        detailedReportFilterBtn: () => cy.get('[qa-element="grouped-detail-1"]'),
    }
    actions = {
        isVisibleConsuptionHeader: () => {
            this.elements.pageHeader().should('be.visible')
        },
        getInvoiceRequest: (request) => {
            function formatNumber(num) {
                return (num / 100)
                    .toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })
                    .replace(/,/g, ' ');
            }

            cy.wait(request).then((interception) => {
                expect(interception.response.statusCode).to.eq(200)
                expect(interception.response.body).to.have.property('data')
                cy.fixture('invoice.json').then((invoiceJson) => {
                    interception.response.body.data[1].statisticInvoices.forEach((item) => {
                        expect(item).to.have.property('resourceName')
                        expect(item).to.have.property('price')
                        if (item.price !== 0) {
                            const foundInvoice = invoiceJson.find(invoice => invoice.recource_name == item.resourceName)
                            this.elements.tableResource(foundInvoice.desc).should('be.visible')
                            this.elements.tablePrice(foundInvoice.desc, formatNumber(item.price)).should('be.visible')
                        }
                    })
                });
            });
        },
        getInvoiceRequestAll: (request) => {
            function formatNumber(num) {
                return (num / 100)
                    .toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })
                    .replace(/,/g, ' ');
            }

            cy.wait(request).then((interception) => {
                expect(interception.response.statusCode).to.eq(200)
                expect(interception.response.body).to.have.property('data')
                cy.fixture('invoice.json').then((invoiceJson) => {
                    const responseData = interception.response.body.data
                    const mergedData = [];

                    responseData.forEach((dataItem) => {
                        dataItem.statisticInvoices.forEach((item) => {
                            const existingItem = mergedData.find(mergedItem => mergedItem.resourceName === item.resourceName);
                            if (existingItem) {
                                existingItem.price += item.price;
                            } else {
                                mergedData.push({ resourceName: item.resourceName, price: item.price });
                            }
                        });
                    });
                    mergedData.forEach((item) => {
                        expect(item).to.have.property('resourceName')
                        expect(item).to.have.property('price')
                        if (item.price !== 0) {
                            cy.log(`Resource: ${item.resourceName}, Price: ${item.price}`)
                            const foundInvoice = invoiceJson.find(invoice => invoice.recource_name == item.resourceName)
                            this.elements.tableResource(foundInvoice.desc).should('be.visible')
                            this.elements.tablePrice(foundInvoice.desc, formatNumber(item.price)).should('be.visible')
                        }
                    })
                });
            });
        },
        checkMonthPriceFilter: () => {
            this.elements.thisMonthPriceFilter().check()
        },
        checkDayPriceFilter: () => {
            this.elements.thisDayPriceFilter().check()
        },
        clickLocationFilterBtn: () => {
            this.elements.locationFilterBtn().click()
        },
        selectLocation: (location) => {
            this.elements.locationList(location).click()
        },
        clickGraphicInvoiceBtn: () => {
            this.elements.graphicInvoiceBtn().click()
        },
        clickDetailedInvoiceBtn: () => {
            this.elements.detailedInvoiceBtn().click()
        },
        getGraphicInvoiceMonthRequest: (request) => {
            function formatNumber(num) {
                return (num / 100)
                    .toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })
                    .replace(/,/g, ' ');
            }
            cy.wait(request).then((interception) => {
                expect(interception.response.statusCode).to.eq(200)
                expect(interception.response.body).to.have.property('data')

                const responseData = interception.response.body.data
                expect(responseData[0]).to.have.property('month')
                expect(responseData[0]).to.have.property('price')

                this.elements.graphInvoicePriceLbl(0).should('be.visible')
                this.elements.graphInvoicePriceLbl(0).should('contain', formatNumber(responseData[0].price))
            });
        },
        getGraphicInvoiceDailyRequest: (request) => {
            function formatNumber(num) {
                return (num / 100)
                    .toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })
                    .replace(/,/g, ' ');
            }
            cy.wait(request).then((interception) => {
                expect(interception.response.statusCode).to.eq(200)
                expect(interception.response.body).to.have.property('data')

                const responseData = interception.response.body.data
                for (let i = 0; i < responseData.length; i++) {
                    expect(responseData[i]).to.have.property('date')
                    expect(responseData[i]).to.have.property('price')

                    this.elements.graphInvoicePriceLbl(i).should('contain', formatNumber(responseData[i].price))
                }
            });
        },
        getDetailedInvoiceRequest: (request, typeID, nameID, costID) => {
            function formatNumber(value) {
                const parts = value.toFixed(2).split('.');
                const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
                return `${integerPart}.${parts[1]}`;
            }
            cy.wait(request).then((interception) => {
                expect(interception.response.statusCode).to.eq(200)
                expect(interception.response.body).to.have.property('data')

                const responseData = interception.response.body.data.report
                for (let i = 0; i < responseData.length; i++) {
                    expect(responseData[i]).to.have.property('totalCost')
                    expect(responseData[i]).to.have.property('serviceType')
                    expect(responseData[i]).to.have.property('serviceName')

                    this.elements.detailedInvoiceLbl(i, nameID).should('contain', responseData[i].serviceName)
                    this.elements.detailedInvoiceLbl(i, costID).should('contain', formatNumber(responseData[i].totalCost))
                    cy.fixture('detailedInvoice.json').then((detailedInvoiceJson) => {
                        const foundInvoice = detailedInvoiceJson.find(invoice => invoice.service_name == responseData[i].serviceType)
                        this.elements.detailedInvoiceLbl(i, typeID).should('contain', foundInvoice.detailed_name)
                    });
                }
            });
        },
        clickGraphInvoiceTimeFilterBtn: () => {
            this.elements.graphInvoiceTimeFilterBtn().click()
        },
        selectFilterOption: (option) => {
            this.elements.graphInvoiceFilterOption(option).click()
        },
        checkGraphInvoicePredictBtn: () => {
            this.elements.graphInvoicePredictBtn().check()
        },
        clickGraphInvoiceRegionFilterBtn: () => {
            this.elements.graphInvoiceRegionFilterBtn().click()
        },
        clickDetailedProjectFilterBtn: () => {
            this.elements.detailedProjectFilterBtn().click()
        },
        clickDetailedRegionFilterBtn: () => {
            this.elements.detailedRegionFilterBtn().click()
        },
        clickDetailedServiceFilterBtn: () => {
            this.elements.detailedServiceFilterBtn().click()
        },
        clickDetailedReportFilterBtn: () => {
            this.elements.detailedReportFilterBtn().click()
        }
    }
}





module.exports = new ConsuptionPage()