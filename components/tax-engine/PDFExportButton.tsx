"use client";

import React from 'react';
import { FileDown, Loader2 } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface PDFExportButtonProps {
    scenarioName: string;
    brainType: 'life' | 'growth' | 'niche';
    scenarioType: string;
    facts: any;
    results: any;
}

export default function PDFExportButton({
    scenarioName,
    brainType,
    scenarioType,
    facts = {},
    results = { total_savings: 0, risk_score: { score: 0, level: 'LOW', flags: [] }, recommendations: [] }
}: PDFExportButtonProps) {
    const [isGenerating, setIsGenerating] = React.useState(false);

    const getBrainDisplayName = (type: string) => {
        const names: Record<string, string> = {
            life: 'Life Engine',
            growth: 'Growth Engine',
            niche: 'Niche Engine'
        };
        return names[type] || type;
    };

    const formatScenarioType = (type: string) => {
        if (!type) return 'Tax Optimization';
        return type
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const generatePDF = () => {
        setIsGenerating(true);

        try {
            // Initialize jsPDF with safe settings
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            let yPos = 20;

            // Header
            doc.setFontSize(24);
            doc.setFont('helvetica', 'bold');
            doc.text('TaxBuddy Canada', 20, yPos);

            yPos += 10;
            doc.setFontSize(16);
            doc.setTextColor(100, 100, 100);
            doc.text('Tax Optimization Report', 20, yPos);

            // Reset color
            doc.setTextColor(0, 0, 0);

            // Scenario Info
            yPos += 15;
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text(`Scenario: ${scenarioName || 'Untitled Scenario'}`, 20, yPos);

            yPos += 7;
            doc.text(`Brain: ${getBrainDisplayName(brainType)}`, 20, yPos);

            yPos += 7;
            doc.text(`Type: ${formatScenarioType(scenarioType)}`, 20, yPos);

            yPos += 7;
            doc.text(`Generated: ${new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}`, 20, yPos);

            // Divider
            yPos += 10;
            doc.setDrawColor(200, 200, 200);
            doc.line(20, yPos, 190, yPos);

            // Tax Savings Summary
            yPos += 15;
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('TAX SAVINGS SUMMARY', 20, yPos);

            yPos += 10;
            doc.setFontSize(20);
            doc.setTextColor(16, 185, 129); // Emerald color
            const savings = typeof results?.total_savings === 'number' ? results.total_savings : 0;
            doc.text(`$${savings.toLocaleString()}`, 20, yPos);

            yPos += 7;
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text('Estimated Annual Tax Savings', 20, yPos);

            doc.setTextColor(0, 0, 0);

            // Divider
            yPos += 10;
            doc.line(20, yPos, 190, yPos);

            // CRA Audit Risk Assessment
            yPos += 15;
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('CRA AUDIT RISK ASSESSMENT', 20, yPos);

            yPos += 10;
            const riskScore = results?.risk_score?.score ?? 0;
            const riskLevel = results?.risk_score?.level || 'LOW';
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text(`Risk Score: ${riskScore}/100`, 20, yPos);

            yPos += 7;
            const riskColor = riskLevel === 'LOW' ? [34, 197, 94] :
                riskLevel === 'MEDIUM' ? [234, 179, 8] :
                    [239, 68, 68];
            doc.setTextColor(riskColor[0], riskColor[1], riskColor[2]);
            doc.setFont('helvetica', 'bold');
            doc.text(`Risk Level: ${riskLevel}`, 20, yPos);
            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica', 'normal');

            // Risk Flags
            const flags = results?.risk_score?.flags || [];
            if (flags.length > 0) {
                yPos += 10;
                doc.setFontSize(12);
                doc.setFont('helvetica', 'bold');
                doc.text('Risk Flags:', 20, yPos);
                doc.setFont('helvetica', 'normal');

                flags.forEach((flag: any) => {
                    yPos += 7;
                    if (yPos > 270) {
                        doc.addPage();
                        yPos = 20;
                    }
                    doc.setFontSize(10);
                    const flagMsg = typeof flag === 'string' ? flag : flag.message || 'Action required';
                    doc.text(`• ${flagMsg}`, 25, yPos);
                });
            } else {
                yPos += 10;
                doc.setFontSize(10);
                doc.setTextColor(100, 100, 100);
                doc.text('No risk flags detected', 20, yPos);
                doc.setTextColor(0, 0, 0);
            }

            // Divider
            yPos += 10;
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
            doc.line(20, yPos, 190, yPos);

            // Recommendations
            yPos += 15;
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('RECOMMENDATIONS', 20, yPos);

            const recommendations = results?.recommendations || [];
            if (recommendations.length > 0) {
                recommendations.forEach((rec: any, index: number) => {
                    yPos += 10;
                    if (yPos > 260) {
                        doc.addPage();
                        yPos = 20;
                    }
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'bold');
                    doc.text(`${index + 1}.`, 20, yPos);
                    doc.setFont('helvetica', 'normal');

                    const message = typeof rec === 'string' ? rec : rec.params?.message || rec.message || 'Optimize deductions';
                    const lines = doc.splitTextToSize(message, 160);
                    doc.text(lines, 28, yPos);
                    yPos += (lines.length - 1) * 5;
                });
            } else {
                yPos += 10;
                doc.setFontSize(10);
                doc.setFont('helvetica', 'normal');
                doc.text('No specific recommendations at this time.', 20, yPos);
            }

            // Divider
            yPos += 15;
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
            doc.line(20, yPos, 190, yPos);

            // Input Details
            yPos += 15;
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('INPUT DETAILS', 20, yPos);

            yPos += 10;
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');

            // Format facts for display
            const factEntries = facts ? Object.entries(facts) : [];
            factEntries.forEach(([key, value]) => {
                if (yPos > 270) {
                    doc.addPage();
                    yPos = 20;
                }
                const formattedKey = key
                    .split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');

                let formattedValue = value;
                if (typeof value === 'boolean') {
                    formattedValue = value ? 'Yes' : 'No';
                } else if (typeof value === 'number' && (key.includes('income') || key.includes('expense') || key.includes('cost'))) {
                    formattedValue = `$${value.toLocaleString()}`;
                } else if (value === null || value === undefined) {
                    formattedValue = 'N/A';
                }

                doc.text(`${formattedKey}: ${formattedValue}`, 20, yPos);
                yPos += 6;
            });

            // Footer
            const pageCount = doc.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(150, 150, 150);
                doc.text(
                    `Page ${i} of ${pageCount} | Generated by TaxBuddy Canada | taxbuddycanada.ca`,
                    105,
                    290,
                    { align: 'center' }
                );
            }

            // Save the PDF
            const sanitizedName = (scenarioName || 'Tax_Report')
                .replace(/[/\\?%*:|"<>]/g, '_')
                .trim();

            const fileName = `${sanitizedName}_${new Date().toISOString().split('T')[0]}.pdf`;
            doc.save(fileName);

        } catch (error) {
            console.error('PDF generation error:', error);
            alert('Failed to generate PDF. We are fixing this. Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <button
            onClick={generatePDF}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-xl font-bold text-navy-950 hover:border-blue-400 hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-growth focus:ring-offset-2"
        >
            {isGenerating ? (
                <>
                    <Loader2 size={18} className="animate-spin" />
                    Generating...
                </>
            ) : (
                <>
                    <FileDown size={18} />
                    Export PDF
                </>
            )}
        </button>
    );
}
